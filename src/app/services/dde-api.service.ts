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
  private csv_sample_module2: string;
  private bike_share_weather_csv_sample_module: string;
  private bike_share_rides_demograph_csv_sample_module: string;

  constructor(private http: Http, private encryptService: EncryptService) {
  }

  async createNewSession() {
    this.session = new Session();

    if (this.api != null) {
      console.log("there was already an api object");
      this.api._node.hidden = true;
      this.api = null;
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

/*
    window.api.initialize().then(function() {
        console.log('API created successfully.');
    }, function(err) {
        console.log('Failed to create API. ' + err.message);
    });
*/


      try {
        await this.api.initialize();
        console.log('API created successfully.');
      } catch (e) {
        console.log('Unable to initialize API instance: ' + e.message);
        return null;
      }

      console.log(this.api.dashboard);

      //await this.api.close();
      //console.log("closed API!!");

      return this.api.apiId;
  }

  async createDashboard()  {
    this.dashboardAPI = await this.api.dashboard.createNew();

    console.log('Dashboard created successfully.');
    console.log(this.dashboardAPI);
    return this.dashboardAPI;
  }

  async getDashboardSampleSpec(): Promise<void> {

    // return if it was already fetched from before
    if (this.sample_db_spec != null) {
      return;
    }

    //get the sampleSepc json ready
    const response = await this.http.get('/assets/dashboardspec.json').toPromise();
    this.sample_db_spec = response.json();
  }

  async openDashboard() {
    await this.getDashboardSampleSpec();
    console.log("got dashboard: " + this.sample_db_spec);
    this.dashboardAPI = await this.api.dashboard.openDashboard({
      dashboardSpec: this.sample_db_spec
    });
    console.log('Dashboard opened successfully.');
    console.log(this.dashboardAPI);
    return this.dashboardAPI;
  }

/*
  async getDB2SampleModule() {
    // return if it was already  fetched from before
    if (this.db2_sample_module != null) {
      return this.db2_sample_module;
    }

    const response = await this.http.get('/assets/ddeDb2SampleModule.json').toPromise();
    this.db2_sample_module = response.json();
    return this.db2_sample_module;
  }

  async addDb2SampleSource() {
    const sampleModule = await this.getDB2SampleModule();
    this.dashboardAPI.addSources([{
      module: sampleModule,
      name: 'Test DB2 Source',
      id: 'myUniqueId123'
    }]);
  }
*/


  async getCSVSampleModuleJson(url) {
    const response = await this.http.get(url).toPromise();
    return response.json();
  }

  async getCSVSampleModule() {
    if (this.csv_sample_module == null) {
      this.csv_sample_module = await this.getCSVSampleModuleJson('/assets/ddeCSVSampleModule.json');
    }
    return this.csv_sample_module;
  }

  async getBikeShareWeatherCSVSampleModule() {
    if (this.bike_share_weather_csv_sample_module == null) {
      this.bike_share_weather_csv_sample_module = await this.getCSVSampleModuleJson('/assets/bikeShareWeatherSampleModule.json');
    }
    return this.bike_share_weather_csv_sample_module;
  }

  async getBikeShareRidesDemographCSVSampleModule() {
    if (this.bike_share_rides_demograph_csv_sample_module == null) {
      this.bike_share_rides_demograph_csv_sample_module = await this.getCSVSampleModuleJson('/assets/bikeShareRidesDemographicsSampleModule.json');
    }
    return this.bike_share_rides_demograph_csv_sample_module;
  }


  async addCSVSampleSource() {
    const sampleModule = await this.getCSVSampleModule();
    this.dashboardAPI.addSources([{
      module: sampleModule,
      name: 'Test CSV Source',
      id: 'myUniqueId789'
    }]);
  }

/*
  async addProtectedDB2SampleSource() {
    const sampleModule = await this.getDB2SampleModule();
    this.encryptService.setKey(this.session.keys[0]);
    const encryptedSampleModule = this.encryptService.encryptModuleInfo(sampleModule);

    console.log("protected DB2 sample module: " + encryptedSampleModule);
    this.dashboardAPI.addSources([{
      module: encryptedSampleModule,
      name: 'Protected DB2 Source',
      id: 'myUniqueId456'
    }]);
  }
*/

  async addProtectedCSVSampleSource() {
    const sampleModule = await this.getCSVSampleModule();
    this.encryptService.setKey(this.session.keys[0]);
    const encryptedSampleModule = this.encryptService.encryptModuleInfo(sampleModule);

    console.log("protected CSV sample module: " + encryptedSampleModule);

    this.dashboardAPI.addSources([{
      module: encryptedSampleModule,
      name: 'Protected CSV Source',
      id: 'myUniqueId987'
    }]);
  }

  async addBikeShareWeatherCSVSampleSource() {
    const sampleBikeShareWeatherModule = await this.getBikeShareWeatherCSVSampleModule();
    this.dashboardAPI.addSources([{
      module: sampleBikeShareWeatherModule,
      name: 'Test Bike Share Weather Source',
      id: 'myUniqueId111'
    }]);
  }

  async addBikeShareRidesDemographCSVSampleSource() {
    const sampleBikeShareRidesDemographModule = await this.getBikeShareRidesDemographCSVSampleModule();
    this.dashboardAPI.addSources([{
      module: sampleBikeShareRidesDemographModule,
      name: 'Test Bike Share Rides Demographics Source',
      id: 'myUniqueId222'
    }]);
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
    this.dashboardAPI.on(this.dashboardAPI.EVENTS.DIRTY, this.onModified);
  }

  unregisterCallback() {
    this.dashboardAPI.off(this.dashboardAPI.EVENTS.DIRTY, this.onModified);
  }

  // handle the event when the api returns an error
  onError(event) {
      console.log('onError:' + JSON.stringify(event));
  }

  registerApiCallback() {
    this.api.on(this.dashboardAPI.EVENTS.REQUEST_ERROR, this.onError);
    console.log("REQUEST_ERROR event callback registered.");
  }

  unregisterApiCallback() {
    this.api.off(this.dashboardAPI.EVENTS.REQUEST_ERROR, this.onError);
    console.log("REQUEST_ERROR event callback unregistered.");
  }

  async closeApiFramework() {
    await this.api.close();
    console.log('API closed successfully.');
  }

}
