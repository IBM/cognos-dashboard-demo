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
    console.log("in create new session");

    if (this.api != null) {
      console.log("there was already an api object");
      this.api._node.hidden = true;
      this.api = null;
    }

    let options = new RequestOptions({
       headers: contentHeaders,
       url: window.location.origin
     });

    const response = await this.http.post('/api/dde/session', options).toPromise();

    const data = response.json();
    console.log(data);
    this.session.code = data.sessionCode;
    this.session.id = data.sessionId;
    this.session.keys = data.keys.map(k => new SessionKey(k));
    return this.session;
  }

  async createAndInitApiFramework() {
    console.log("in create and init api framework");
    // Create an instance of the CognosApi
    this.api = new CognosApi({
          cognosRootURL: environment.cognos_root_url,
          sessionCode: this.session.code,
          node: document.getElementById('containerDivId3')
          });
    this.api._node.hidden = false;

     // TODO: as confirmed with Jim, use event handler instead of try/catch to catch 'invalid session' errors, waiting for
     // events to be added by Jim
     // https://bajazz05.canlab.ibm.com:9750/ccm/web/projects/Business%20Intelligence#action=com.ibm.team.workitem.viewWorkItem&id=217618
      await this.api.initialize();

      console.log('API created successfully.');
      console.log(this.api.dashboard);

    return this.api.apiId;
  }

  async createDashboard()  {
  /*  let self = this;
    this.api.dashboard.createNew().then(
        function(dashboardAPI) {
            console.log('Dashboard created successfully.');
          //  self.ddeApiService.dashboardAPI = dashboardAPI;
           self.ddeApiService.setDashboardApi(dashboardAPI);
          console.log(self.api.dashboard);
        }
    ).catch(
        function(err) {
            console.log('User hit cancel on the template picker page.');
        }
    );*/
    console.log("in create dashboard");
    this.dashboardAPI = await this.api.dashboard.createNew();

    console.log('Dashboard created successfully.');
    console.log(this.dashboardAPI);
    return this.dashboardAPI;
  }

  async getDashboardSampleSpec(): Promise<void> {

    // return if it was already fetched from before
    if (this.sample_db_spec != null) {
      return; //this.sample_db_spec;
    }

    //get the sampleSepc json ready
    const response = await this.http.get('/assets/ddeSampleSpec.json').toPromise();
    this.sample_db_spec = response.json();
    //return this.sample_db_spec;
  }

  async openDashboard() {
    /*
    window.api.dashboard.openDashboard({
    dashboardSpec: sampleSpec
    }).then(
        function(dashboardAPI) {
            console.log('Dashboard created successfully.');
            window.dashboardAPI = dashboardAPI;
        }
    ).catch(
        function(err) {
            console.log(err);
        }
    );
    */

    console.log("in open dashboard");
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

  async getCSVSampleModule(url) {
  /*  // return if it was already fetched from before
    if (this.csv_sample_module != null) {
      return this.csv_sample_module;
    }
  */
    const response = await this.http.get(url).toPromise();
    this.csv_sample_module = response.json();
    return this.csv_sample_module;
  }

  async addCSVSampleSource() {
    const sampleModule = this.csv_sample_module != null ?
      this.csv_sample_module :
      await this.getCSVSampleModule('/assets/ddeCSVSampleModule.json');
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
    const sampleModule = this.csv_sample_module != null ?
      this.csv_sample_module :
      await this.getCSVSampleModule('/assets/ddeCSVSampleModule.json');
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
    const sampleModule = this.bike_share_weather_csv_sample_module != null ?
      this.bike_share_weather_csv_sample_module :
      await this.getCSVSampleModule('/assets/bikeShareWeatherSampleModule.json');
    this.dashboardAPI.addSources([{
      module: sampleModule,
      name: 'Test Bike Share Weather Source',
      id: 'myUniqueId111'
    }]);
  }

  async addBikeShareRidesDemographCSVSampleSource() {
    const sampleModule = this.bike_share_rides_demograph_csv_sample_module != null ?
      this.bike_share_rides_demograph_csv_sample_module :
      await this.getCSVSampleModule('/assets/bikeShareRidesDemographicsSampleModule.json');
    this.dashboardAPI.addSources([{
      module: sampleModule,
      name: 'Test Bike Share Rides Demographics Source',
      id: 'myUniqueId222'
    }]);
  }



  setDashboardMode_Edit() {
    /**
    Available modes
    dashboardAPI.MODES.EDIT (authoring mode)
    dashboardAPI.MODES.VIEW (consumption mode)
    dashboardAPI.MODES.EDIT_GROUP (event group mode)
    */
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
    /*
    dashboardAPI.getSpec().then(function(spec){
      console.log(JSON.stringify(spec));
    });
    */
    const spec = await this.dashboardAPI.getSpec();
    console.log(JSON.stringify(spec));
  }

  async updateModuleDefinitions() {
    /*
    // Clone our test spec since we don't want this example to change it
    var dbSpec = JSON.parse(JSON.stringify(sampleSpec));

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

    // Log the before
    console.log(dbSpec.dataSources.sources);

    window.api.updateModuleDefinitions(dbSpec, getNewModulesCallback).then(function(newDBSpec) {
        console.log(newDBSpec.dataSources.sources);
    });
    */

    //var dbSpec = JSON.parse(JSON.stringify(this.sample_db_spec));
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

  // register the event handler
  registerCallback() {
    this.dashboardAPI.on(this.dashboardAPI.EVENTS.DIRTY, this.onModified);
/*
    this.dashboardAPI.on(this.dashboardAPI.EVENTS.DIRTY, function(event) {
        console.log('onDirty:' + JSON.stringify(event));
    });
*/
  }

  unregisterCallback() {
    this.dashboardAPI.off(this.dashboardAPI.EVENTS.DIRTY, this.onModified);
  }


}
