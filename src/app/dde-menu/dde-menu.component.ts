import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { CodeSnippet, CodeSnippetEnum } from '../../model/code-snippet'
import { CodeSnippetsRepoService } from '../services/code-snippets-repo.service';
import { DdeApiService } from '../services/dde-api.service';

export const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');

@Component({
  selector: 'dde-menu',
  templateUrl: './dde-menu.component.html',
  styleUrls: ['./dde-menu.component.css']
})
export class DdeMenuComponent implements OnInit {
  @Output()
  moduleDefinitionUpdated: EventEmitter<String> = new EventEmitter<String>();
  @Output()
  codeToRun = new EventEmitter<CodeSnippet>();
  nextStep: CodeSnippetEnum;
  currentSelection: CodeSnippetEnum;

  public client_id : string;
  public client_secret: string;
  public updated_db_spec : string;
  public code_samples: string;
  private collapsed: boolean = true;
  private isFirstOpen: boolean = true;

  constructor(private http: Http, private ddeApiService: DdeApiService,
              private codeSnippetsRepoService: CodeSnippetsRepoService) {
  }

  ngOnInit() {
    this.nextStep = CodeSnippetEnum.CreateSession;
    this.displayNewSessionCode();
  }

  ngAfterContentInit() {
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

  // TODO: refactor, take in CodeSnippetEnum value and make these methods generic when firing the codeToRun event

  displayNewSessionCode() {
    this.currentSelection = CodeSnippetEnum.CreateSession;
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(this.currentSelection));
  }

  displayInitApiFrameworkCode() {
    this.currentSelection = CodeSnippetEnum.CreateAPIFramework;
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(this.currentSelection));
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

  undoLastAction() {
    this.currentSelection = CodeSnippetEnum.UndoLastAction;
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(this.currentSelection));
  }

  redoLastAction() {
    this.currentSelection = CodeSnippetEnum.RedoLastAction;
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(this.currentSelection));
  }

  togglePropertiesPane() {
    this.currentSelection = CodeSnippetEnum.TogglePropertiesPane;
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(this.currentSelection));
  }

  getDashboardSpec() {
    this.currentSelection = CodeSnippetEnum.GetDashboardSpec;
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(this.currentSelection));
  }

  updateModuleDefinitions() {
    this.currentSelection = CodeSnippetEnum.UpdateModuleDefinitions;
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(this.currentSelection));
  }

  clearDirtyState() {
    this.currentSelection = CodeSnippetEnum.ClearDirtyState;
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(this.currentSelection));
  }

  registerCallback() {
    this.currentSelection = CodeSnippetEnum.RegisterCallback;
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(this.currentSelection));
  }

  unregisterCallback() {
    this.currentSelection = CodeSnippetEnum.UnregisterCallback;
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(this.currentSelection));
  }

}
