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
  private db2_sample_module: string;
  private csv_sample_module: string;

  constructor(private http: Http, private encryptService: EncryptService) {

  }

  async createNewSession() : Promise<Session> {
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

  async createAndInitApiFramework() : Promise<string> {
    console.log("in create and init api framework");

    // Create an instance of the CognosApi
    this.api = new CognosApi({
          cognosRootURL: environment.cognos_root_url,
          sessionCode: this.session.code,
          node: document.getElementById('containerDivId3')
          });
    this.api._node.hidden = false;

    // initialize the CognosApi in order to obtain the service APIs
    await this.api.initialize();
    console.log('API created successfully.');
    console.log(this.api.dashboard);

    return this.api.apiId;
  }

  async setDashboardApi()  {
    console.log("in create dashboard");
     this.dashboardAPI = await this.api.dashboard.createNew();
     console.log('Dashboard created successfully.');
     console.log(this.dashboardAPI);
  }

  async getDB2SampleModule(): Promise<string> {

    // return if it was already fetched from before
    if (this.db2_sample_module != null) {
      return this.db2_sample_module;
    }

    const response = await this.http.get('/assets/ddeDb2SampleModule.json').toPromise();
    this.db2_sample_module = response.json();
    return this.db2_sample_module;
  }

  addDb2SampleSource(db2_sample_module) {
    this.dashboardAPI.addSources([{
      module: db2_sample_module,
      name: 'Test DB2 Source',
      id: 'myUniqueId123'
    }]);
  }

  async getCSVSampleModule(): Promise<string> {

    // return if it was already fetched from before
    if (this.csv_sample_module != null) {
      return this.csv_sample_module;
    }

    const response = await this.http.get('/assets/ddeCSVSampleModule.json').toPromise();
    this.csv_sample_module = response.json();
    return this.csv_sample_module;
  }

  addCSVSampleSource(csv_sample_module) {
    this.dashboardAPI.addSources([{
      module: csv_sample_module,
      name: 'Test CSV Source',
      id: 'myUniqueId789'
    }]);
  }

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
    /**
    Available modes
    dashboardAPI.MODES.EDIT (authoring mode)
    dashboardAPI.MODES.VIEW (consumption mode)
    dashboardAPI.MODES.EDIT_GROUP (event group mode)
    */

    this.dashboardAPI.setMode(this.dashboardAPI.MODES.VIEW);
  }

  setDashboardMode_EditGroup() {
    /**
    Available modes
    dashboardAPI.MODES.EDIT (authoring mode)
    dashboardAPI.MODES.VIEW (consumption mode)
    dashboardAPI.MODES.EDIT_GROUP (event group mode)
    */
    this.dashboardAPI.setMode(this.dashboardAPI.MODES.EDIT_GROUP);
  }


}
