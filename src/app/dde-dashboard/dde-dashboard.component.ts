import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
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
  @Input()
  nextStep: CodeSnippetEnum;
  currentSelection: CodeSnippetEnum;

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
    this.displayNewSessionCode();
  }

  ngAfterContentInit() {
      this.script.load('cognosapijs').then(data => {
      console.log('script loaded ', data);
      }).catch(error => console.log(error));
  }

  nextStepToProcess() {
    return this.nextStep;
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

  displayNewSessionCode() {
    this.currentSelection = CodeSnippetEnum.CreateSession;
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(this.currentSelection));
  }

  displayInitApiFrameworkCode() {
    this.currentSelection = CodeSnippetEnum.CreateAPIFramework;
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(this.currentSelection));
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
    this.currentSelection = CodeSnippetEnum.CreateDashboard;
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(this.currentSelection));
  }

  displayOpenDashboardCode() {
    this.currentSelection = CodeSnippetEnum.OpenDashboard;
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(this.currentSelection));
  }

  addSourcesToDashboard() {
    this.currentSelection = CodeSnippetEnum.AddCSVSource;
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(this.currentSelection));
  }

  setDashboardEditMode() {
    this.currentSelection = CodeSnippetEnum.DashboardEditMode;
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(this.currentSelection));
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
    this.currentSelection = CodeSnippetEnum.UndoLastAction;
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(this.currentSelection));
  }

  redoLastAction() {
    this.currentSelection = CodeSnippetEnum.RedoLastAction;
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(this.currentSelection));
  }

  getDashboardSpec() {
    this.currentSelection = CodeSnippetEnum.GetDashboardSpec;
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(this.currentSelection));
  }

  clearDirtyState() {
    this.currentSelection = CodeSnippetEnum.ClearDirtyState;
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(this.currentSelection));
  }
}
