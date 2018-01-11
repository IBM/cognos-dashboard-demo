import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { Session } from '../model/session';

export const contentHeaders = new Headers();

@Injectable()
export class DdeApiService {
  private ddeMyVar: string;
  private dashboardAPI;
  public api;
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
