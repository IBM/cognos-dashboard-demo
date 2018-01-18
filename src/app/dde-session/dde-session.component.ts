import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { ScriptService } from '../script.service';
import { DdeApiService } from '../services/dde-api.service';
import { CodeSnippet, NewSessionCS, InitAPICS, CreateDashBoardCS } from '../../model/code-snippet'


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
  public sample_db_spec : string;
  public updated_db_spec : string;
  public code_samples: string;

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
    this.codeToRun.emit(NewSessionCS);
  }

  displayInitApiFrameworkCode() {
    this.codeToRun.emit(InitAPICS);
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
