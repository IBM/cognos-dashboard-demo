import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { CodeSnippet, CodeSnippetEnum } from '../../model/code-snippet'
import { CodeSnippetsRepoService } from '../services/code-snippets-repo.service';
import { ScriptService } from '../services/script.service';
import { DdeApiService } from '../services/dde-api.service';


export const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');

@Component({
  selector: 'dde-dashboard',
  templateUrl: './dde-dashboard.component.html',
  styleUrls: ['./dde-dashboard.component.css'],
  providers: [ ScriptService]
})
export class DdeDashboardComponent implements OnInit {
  @Output()
  moduleDefinitionUpdated: EventEmitter<String> = new EventEmitter<String>();
  @Output()
  codeToRun = new EventEmitter<CodeSnippet>();

  public client_id : string;
  public client_secret: string;
  //public sample_db_spec : string;
  public updated_db_spec : string;
  public code_samples: string;
  private collapsed: boolean = true;
  private isFirstOpen: boolean = true;

  constructor(private http: Http, private script: ScriptService,
              private ddeApiService: DdeApiService, private codeSnippetsRepoService: CodeSnippetsRepoService) {
  }

  ngOnInit() {
      // this.getDDECred();
  }

  ngAfterContentInit() {
      this.script.load('cognosapijs').then(data => {
      console.log('script loaded ', data);
      }).catch(error => console.log(error));
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
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
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(CodeSnippetEnum.CreateSession));
  }

  displayInitApiFrameworkCode() {
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(CodeSnippetEnum.CreateAPIFramework));
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


  displayCreateDashboardCode() {
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(CodeSnippetEnum.CreateDashboard));
  }

  displayOpenDashboardCode() {
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(CodeSnippetEnum.OpenDashboard));
  }

  addSourcesToDashboard() {
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(CodeSnippetEnum.AddCSVSource));
  }

  setDashboardEditMode() {
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(CodeSnippetEnum.DashboardEditMode));
  }

/*
  setDashboardViewMode() {
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(CodeSnippetEnum.DashboardViewMode));
  }

  setDashboardEditGroupMode() {
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(CodeSnippetEnum.DashboardEditGroupMode));
  }
*/

  undoLastAction() {
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(CodeSnippetEnum.UndoLastAction));
  }

  redoLastAction() {
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(CodeSnippetEnum.RedoLastAction));
  }
}
