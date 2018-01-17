import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { ScriptService } from '../script.service';
import { DdeApiService } from '../dde-api.service';
import { CodeSnippet, NewSessionCS, InitAPICS, CreateDashBoardCS } from '../../model/code-snippet'
//declare var CognosApi;


export const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');


@Component({
  selector: 'dde-session',
  templateUrl: './dde-session.component.html',
  styleUrls: ['./dde-session.component.css'],
  providers: [ ScriptService]
})
export class DdeSessionComponent implements OnInit {
  @Output()
  moduleDefinitionUpdated: EventEmitter<String> = new EventEmitter<String>();
  @Output()
  codeToRun = new EventEmitter<CodeSnippet>();


  public client_id : string;
  public client_secret: string;
  //public session_code: string;
  //public session_info: string;
  //public api;
//  public api_framework_created_info: string;

  public sample_db_spec : string;
  public updated_db_spec : string;
  public code_samples: string;
  //public code_snippet = new CodeSnippet();

  constructor(private http: Http, private script: ScriptService, private ddeApiService: DdeApiService ) {

    //get the sampleSepc json ready
    this.http.get('/assets/ddeSampleSpec.json').subscribe(
            data => {
              console.log("in dde-session constructor");
              this.sample_db_spec = data.json();
              console.log(data.json());
            }
        );
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

  displayNewSessionCode(event) {
    // this.code_snippet.selection = 1;
    // this.code_snippet.code = 'You created a new session';
    // this.code_snippet.size = 'large';
    this.codeToRun.emit(NewSessionCS);

    // // nullify prevoius statuses and api
    // this.sessionInfoCreated.emit(null);
    // this.apiFrameworkCreated.emit(null);
    // this.moduleDefinitionUpdated.emit(null);
    // if (this.api != null) {
    //   console.log("there was already an api object");
    //   this.api._node.hidden = true;
    //   this.api = null;
    // }

    /*let options = new RequestOptions({headers: contentHeaders});
    let self = this;
    this.http.post('/api/dde/session', options).subscribe(
            data => {
              console.log("in dde-session createNewSession");
              console.log(JSON.stringify(data));
              self.session_code = data.json().sessionCode;
              self.session_info = JSON.stringify(data.json(), undefined, 4);
              self.sessionInfoCreated.emit(self.session_info);
            }
    );*/

  }

  displayInitApiFrameworkCode() {
    // this.code_snippet.selection = 2;
    // this.code_snippet.code = 'You initiated an API';
    // this.code_snippet.size = 'small';
    this.codeToRun.emit(InitAPICS);

    // Create an instance of the CognosApi
    /*this.api = new CognosApi({
          cognosRootURL: 'https://jdcluster.us-south.containers.mybluemix.net/daas/',
          sessionCode: this.session_code,
          node: document.getElementById('containerDivId3')
          });
    this.api._node.hidden = false;

    let self = this;

    // initialize the CognosApi in order to obtain the service APIs
    this.api.initialize().then(function() {
        //self.api_framework_created_info = "successful";
        self.apiFrameworkCreated.emit(self.session_code);
        console.log('API created successfully.');
        console.log(self.api.dashboard);

      });*/

  }

  updateModuleDefinitions() {
    // console.log("in update module definitions");
    //
    // var dbSpec = JSON.parse(JSON.stringify(this.sample_db_spec));
    // console.log(dbSpec);
    //
    // var getNewModulesCallback = function(ids) {
    //     var newModules = [];
    //     ids.forEach(function(id) {
    //         newModules.push({
    //             id: id,
    //             module: {
    //                 newModuleDefinition: true
    //             },
    //             name: 'newModuleName',
    //         });
    //     });
    //     return Promise.resolve(newModules);
    // };
    //
    // /* Log the before */
    // console.log("before:");
    // console.log(dbSpec.dataSources.sources);
    //
    // let self = this;
    // this.api.updateModuleDefinitions(dbSpec, getNewModulesCallback).then(function(newDBSpec) {
    //     self.updated_db_spec = JSON.stringify(newDBSpec);
    //     //console.log("updated dbspec:" + self.updated_db_spec);
    //     console.log("after:");
    //     console.log(newDBSpec.dataSources.sources);
    //     self.moduleDefinitionUpdated.emit("test");
    // });
    //
    //
     }

}
