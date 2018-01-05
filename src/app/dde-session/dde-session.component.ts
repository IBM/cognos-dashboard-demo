import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { ScriptService } from '../script.service';
declare var CognosApi;


export const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');

@Component({
  selector: 'dde-session',
  templateUrl: './dde-session.component.html',
  styleUrls: ['./dde-session.component.css'],
  providers: [ ScriptService ]
})
export class DdeSessionComponent implements OnInit {
  @Output()
  sessionInfoCreated: EventEmitter<String> = new EventEmitter<String>();
  @Output()
  apiFrameworkCreated: EventEmitter<String> = new EventEmitter<String>();

  public client_id : string;
  public client_secret: string;
  public session_code: string;
  public session_info: string;
  public api;
  public api_framework_created_info: string;

  constructor(private http: Http, private script: ScriptService ) {
  }

  ngOnInit() {
    // this.getDDECred();
  }

  ngAfterContentInit() {
      this.script.load('cognosapijs').then(data => {
      console.log('script loaded ', data);
      }).catch(error => console.log(error));
  }

  getDDECred() {
    console.log("in get dde creds");

    this.http.get('/api/dde/credentials').subscribe(
            data => {
              console.log("in dde-session getcred");
              this.client_id = data.json().client_id;
              this.client_secret = "****";
              console.log(data.json());
            }
    );
  }

  createNewSession(event) {
    console.log("in create new session");

    // nullify prevoius statuses and api
    this.sessionInfoCreated.emit(null);
    this.apiFrameworkCreated.emit(null);
    if (this.api != null) {
      console.log("there was already an api object");
      this.api._node.hidden = true;
      this.api = null;
    }

    let options = new RequestOptions({headers: contentHeaders});
    let self = this;
    this.http.post('/api/dde/session', options).subscribe(
            data => {
              console.log("in dde-session createNewSession");
              console.log(JSON.stringify(data));
              self.session_code = data.json().sessionCode;
              self.session_info = JSON.stringify(data.json(), undefined, 4);
              self.sessionInfoCreated.emit(self.session_info);
            }
    );

  }

  createAndInitApiFramework(event) {

    console.log("in create and init api framework");

    this.api = new CognosApi({
          cognosRootURL: 'https://jdcluster.us-south.containers.mybluemix.net/daas/',
          sessionCode: this.session_code,
          node: document.getElementById('containerDivId3')
          });
    this.api._node.hidden = false;

    let self = this;
    this.api.initialize().then(function() {
        self.api_framework_created_info = "successfullll"
        self.apiFrameworkCreated.emit(self.session_code);
        console.log('API created successfully.');

      });

  }

  createDashboard() {
    console.log("in create dashboard");

        this.api.dashboard.createNew().then(
            function(dashboardAPI) {
                console.log('Dashboard created successfully.');
                var dashboardAPI = dashboardAPI;
            }
        ).catch(
            function(err) {
                console.log('User hit cancel on the template picker page.');
            }
        );
      }
}
