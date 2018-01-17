import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { Session } from '../model/session';
import{ KEYUTIL } from  'jsrsasign';
import { environment } from '../environments/environment';
declare var CognosApi;

const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');


@Injectable()
export class DdeApiService {
  private dashboardAPI;
  public api = null;
  session: Session;
  private db2_sample_module: string;
  public csv_sample_module: string;
  private validPropertiesToEncrypt;

  constructor(private http: Http) {

     // useSimpleModule is false if and only if window.location.href = "...&simple=false..."
     // useSimpleModule is true if no "simple" or if "simple=true" or if "simple=anything"

     // for now, set useSimpleModule to true
      let useSimpleModule = true;
      this.validPropertiesToEncrypt = useSimpleModule ? ['source.jdbc.schema', 'source.user', 'source.password', 'source.jdbc.jdbcUrl', 'source.srcUrl.sourceUrl'] : ['dataSource.0.schema', 'dataSource.0.user', 'dataSource.0.password', 'dataSource.0.jdbc.jdbcUrl', 'dataSource.0.csvUrl'];
      console.log("validPropertiesToEncrypt:");
      console.log(this.validPropertiesToEncrypt);
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
    // get the sampleModule json ready
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
    // get the sampleModule json ready
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

/*
  addProtectedDb2SampleSource(db2_sample_module) {
    var protectedSampleModule = this.getProtectedSampleModule(db2_sample_module);
    console.log("protected sample module: " + protectedSampleModule);
    this.dashboardAPI.addSources([{
      module: protectedSampleModule,
      name: 'Protected DB2 Source',
      id: 'myUniqueId456'
    }]);
  }

  getProtectedSampleModule(sampleModule) :  string {
    return this._encryptModuleInfo(sampleModule);
  }

  _encryptModuleInfo(module) : string {
    var sampleProtectedModule = JSON.parse(JSON.stringify(module));
    return this._encryptObject(sampleProtectedModule, null);
  }

  _encryptObject(obj, name) : string {
    Object.keys(obj).forEach(function(key) {
      var fullKey = name ? name + '.' + key : key;
      if (typeof obj[key] === 'object') {
        // encrypt the child object
        this._encryptObject(obj[key], fullKey);
      } else if (this.validPropertiesToEncrypt.indexOf(fullKey) !== -1) {
        obj[key] = this._encryptValue(obj[key]);
      }
    });
    return obj;
  }

  _encryptValue(value) : string {
    var keyObj = KEYUTIL.getKey(sessionObj.keys[0]);
    var hex = KJUR.crypto.Cipher.encrypt(value, keyObj);

    return '{enc}' + hextob64(hex);
  }

  getUrlParam(name) : string {
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
      return (results === null) ? '' : results[1];
  }
*/
}
