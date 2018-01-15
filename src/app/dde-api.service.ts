import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { Session } from '../model/session';
declare var CognosApi;

const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');


@Injectable()
export class DdeApiService {
  private ddeMyVar: string;
  private dashboardAPI;
  public api = null;
  session: Session;

  constructor(private http: Http) { }

  myVar = this.ddeMyVar;

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
          cognosRootURL: 'https://jdcluster.us-south.containers.mybluemix.net/daas/',
          sessionCode: this.session.code,
          node: document.getElementById('containerDivId3')
          });
    this.api._node.hidden = false;

    let self = this;

    // initialize the CognosApi in order to obtain the service APIs
    await this.api.initialize();
        console.log('API created successfully.');
        console.log(self.api.dashboard);

    return this.api.apiId;
  }

  setDashboardApi(dashboardAPI) {
    this.dashboardAPI = dashboardAPI;
    console.log(this.dashboardAPI);
  }


  addDb2SampleSource(db2_sample_module) {
    console.log("in dde-api.service");
    console.log(this.dashboardAPI);

    this.dashboardAPI.addSources([{
      module: db2_sample_module,
      name: 'Test Source',
      id: 'myUniqueId123'
    }]);
  }

}
