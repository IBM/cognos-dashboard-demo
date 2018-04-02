import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Session, SessionKey } from '../../model/session';
import { EncryptService } from './encrypt.service';
import { environment } from '../../environments/environment';

declare var CognosApi;

const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');

@Injectable()
export class DdeApiService {

  public api = null;

  private dashboardAPI;
  private session: Session;
  private sample_db_spec: string;
  private db2_sample_module: string;
  private csv_sample_module: string;
  private bike_share_weather_csv_sample_module: string;
  private bike_share_rides_demograph_csv_sample_module: string;

  constructor(private http: Http, private encryptService: EncryptService) {
  }

  async createNewSession() {
    this.session = new Session();

    if (this.api != null) {
      console.log("there was already an api object");
    }

    let options = new RequestOptions({headers: contentHeaders});

    const response = await this.http.post('/api/dde/session', options).toPromise();

    const data = response.json();
    console.log(data);
    this.session.code = data.sessionCode;
    this.session.id = data.sessionId;
    this.session.keys = data.keys.map(k => new SessionKey(k));
    return this.session;
  }


 // initTimeout: initialization timeout (ms). Default 30000 ms.
 // initTimeout allows for whatever latency you expect form your browser making the init() call to getting/loading DDE in the iFrame.
  async createAndInitApiFramework() {
    console.log("in create and init api framework");

    // Create an instance of the CognosApi
    this.api = new CognosApi({
          cognosRootURL: environment.cognos_root_url,
          sessionCode: this.session.code,
          initTimeout: 10000,
          node: document.getElementById('ddeDashboard')
          });

    this.api._node.hidden = false;

    try {
      await this.api.initialize();
      console.log('API created successfully.');
    } catch (e) {
      console.log('Unable to initialize API instance: ' + e.message);
      throw e;
    }

    console.log(this.api.dashboard);
    return this.api.apiId;
  }

  async createDashboard()  {
    this.dashboardAPI = await this.api.dashboard.createNew();

    console.log('Dashboard created successfully.');
    console.log(this.dashboardAPI);
    this.dashboardAPI.state = 'Create';
    return this.dashboardAPI;
  }

  async getDashboardSampleSpec(): Promise<string> {
    let fileName = 'dashboardspec.json';
    // return if it was already fetched from before
    if (this.sample_db_spec != null) {
      return;
    }

    //get the sampleSepc json ready
    const response = await this.http.get('/assets/' + fileName).toPromise();
    this.sample_db_spec = response.json();
    return fileName;
  }

  async openDashboard() {
    await this.getDashboardSampleSpec();
    console.log("got dashboard: " + this.sample_db_spec);
    this.dashboardAPI = await this.api.dashboard.openDashboard({
      dashboardSpec: this.sample_db_spec
    });
    this.dashboardAPI.state = 'Open'
    console.log('Dashboard opened successfully.');
    console.log(this.dashboardAPI);
    return this.dashboardAPI;
  }

  async getCSVSampleModuleJson(url) {
    const response = await this.http.get(url).toPromise();
    return response.json();
  }

  async getCSVSampleModule(fileName: string) {
    if (this.csv_sample_module == null) {
      this.csv_sample_module = await this.getCSVSampleModuleJson('/assets/'+fileName);
    }
    return this.csv_sample_module;
  }

  async getBikeShareWeatherCSVSampleModule(fileName: string) {
    if (this.bike_share_weather_csv_sample_module == null) {
      this.bike_share_weather_csv_sample_module = await this.getCSVSampleModuleJson('/assets/'+fileName);
    }
    return this.bike_share_weather_csv_sample_module;
  }

  async getBikeShareRidesDemographCSVSampleModule(fileName: string) {
    if (this.bike_share_rides_demograph_csv_sample_module == null) {
      this.bike_share_rides_demograph_csv_sample_module = await this.getCSVSampleModuleJson('/assets/'+fileName);
    }
    return this.bike_share_rides_demograph_csv_sample_module;
  }


  async addCSVSampleSource() {
    let filename = 'ddeCSVSampleModule.json';
    const sampleModule = await this.getCSVSampleModule(filename);
    this.dashboardAPI.addSources([{
      module: sampleModule,
      name: 'Test CSV Source',
      id: 'myUniqueId789'
    }]);

    return filename;
  }

  async addProtectedCSVSampleSource() {
    let fileName = 'ddeCSVSampleModule.json';
    const sampleModule = await this.getCSVSampleModule(fileName);
    this.encryptService.setKey(this.session.keys[0]);
    const encryptedSampleModule = this.encryptService.encryptModuleInfo(sampleModule);

    console.log("protected CSV sample module: " + encryptedSampleModule);

    this.dashboardAPI.addSources([{
      module: encryptedSampleModule,
      name: 'Protected CSV Source',
      id: 'myUniqueId987'
    }]);

    return fileName;
  }

  async addBikeShareWeatherCSVSampleSource() {
    let fileName = 'bikeShareWeatherSampleModule.json';
    const sampleBikeShareWeatherModule = await this.getBikeShareWeatherCSVSampleModule(fileName);
    this.dashboardAPI.addSources([{
      module: sampleBikeShareWeatherModule,
      name: 'Test Bike Share Weather Source',
      id: 'myUniqueId111'
    }]);

    return fileName;
  }

  async addBikeShareRidesDemographCSVSampleSource() {
    let fileName = 'bikeShareRidesDemographicsSampleModule.json';
    const sampleBikeShareRidesDemographModule = await this.getBikeShareRidesDemographCSVSampleModule(fileName);
    this.dashboardAPI.addSources([{
      module: sampleBikeShareRidesDemographModule,
      name: 'Test Bike Share Rides Demographics Source',
      id: 'myUniqueId222'
    }]);

    return fileName;
  }


  /**
  Available modes
  dashboardAPI.MODES.EDIT (authoring mode)
  dashboardAPI.MODES.VIEW (consumption mode)
  dashboardAPI.MODES.EDIT_GROUP (event group mode)
  */
  setDashboardMode_Edit() {
    this.dashboardAPI.setMode(this.dashboardAPI.MODES.EDIT);
  }

  setDashboardMode_View() {
    this.dashboardAPI.setMode(this.dashboardAPI.MODES.VIEW);
  }

  setDashboardMode_EditGroup() {
    this.dashboardAPI.setMode(this.dashboardAPI.MODES.EDIT_GROUP);
  }

  undoLastAction() {
    this.dashboardAPI.undo();
  }

  redoLastAction() {
    this.dashboardAPI.redo();
  }

  togglePropertiesPane() {
      this.dashboardAPI.toggleProperties();
  }

  async getDashboardSpec() {
    const spec = await this.dashboardAPI.getSpec();
    console.log(JSON.stringify(spec));
  }

  async updateModuleDefinitions() {
    await this.getDashboardSampleSpec();
    var dbSpec = JSON.parse(JSON.stringify(this.sample_db_spec));

    var getNewModulesCallback = function(ids) {
        var newModules = [];
        ids.forEach(function(id) {
            newModules.push({
                id: id,
                module: {
                    newModuleDefinition: true
                },
                name: 'newModuleName',
            });
        });
        return Promise.resolve(newModules);
    };

    // log the before
    console.log("before update:");
    console.log(dbSpec.dataSources.sources);

    // log the after
    console.log("after update:");
    const newDBSpec = await this.api.updateModuleDefinitions(dbSpec, getNewModulesCallback);
    console.log(newDBSpec.dataSources.sources);
  }

  // update the boolean that is used for the onDirty events
  clearDirtyState() {
      this.dashboardAPI.clearDirty();
  }

  // handle the event when the dashboard is modified
  onModified(event) {

    // if not dirty, JSON.stringify(event) would be {"value":false}
    if (event != null && event.value == true) {
      console.log('dashboard has been modified: ');
    }
    console.log(JSON.stringify(event));
  }

  registerCallback() {
    this.dashboardAPI.on(
      this.dashboardAPI.EVENTS.DIRTY, this.onModified);
    console.log("DIRTY event callback registered.");
  }

  unregisterCallback() {
    this.dashboardAPI.off(
      this.dashboardAPI.EVENTS.DIRTY, this.onModified);
    console.log("DIRTY event callback unregistered.");
  }

  // handle the event when the api returns an error
  onError(event) {
      console.log('onError:' + JSON.stringify(event));
  }

  registerApiCallback() {
    this.api.on(
      CognosApi.EVENTS.REQUEST_ERROR, this.onError);
    console.log("REQUEST_ERROR event callback registered.");
  }

  unregisterApiCallback() {
    this.api.off(
      CognosApi.EVENTS.REQUEST_ERROR, this.onError);
    console.log("REQUEST_ERROR event callback unregistered.");
  }

  async closeApiFramework() {
    await this.api.close();
    console.log('API closed successfully.');
  }

}
