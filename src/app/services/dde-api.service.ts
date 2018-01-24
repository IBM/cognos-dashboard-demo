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

    let options = new RequestOptions({headers: contentHeaders});
    const response = await this.http.post('/api/dde/session', options).toPromise();
    this.session.code = response.json().sessionCode;
    this.session.id = response.json().sessionId;
    this.session.keys = response.json().keys.map(k => new SessionKey(k));
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

   //  try {
   //   var test = await this.api.initialize();
   //   test;
   // }
   // catch (e) {
   //   return 'in here';
   // }

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

  async addCSVSampleSource2() {
    const sampleModule = this.csv_sample_module2 != null ?
      this.csv_sample_module2 :
      await this.getCSVSampleModule('/assets/ddeCSVSampleModule2.json');
    this.dashboardAPI.addSources([{
      module: sampleModule,
      name: 'Test CSV2 Source',
      id: 'myUniqueId111'
    }]);
  }

  async addBikeShareWeatherCSVSampleSource() {
    const sampleModule = this.bike_share_weather_csv_sample_module != null ?
      this.bike_share_weather_csv_sample_module :
      await this.getCSVSampleModule('/assets/bikeShareWeatherSampleModule.json');
    this.dashboardAPI.addSources([{
      module: sampleModule,
      name: 'Test Bike Share Weather Source',
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

}
