import { Component, OnInit, ViewChild } from '@angular/core';
import { CodeSnippetEnum, CodeSnippet } from '../../model/code-snippet';
import { Session } from '../../model/session';
import { Toaster } from '../../model/toaster';
import { CodeSnippetsRepoService } from '../services/code-snippets-repo.service';
import { DdeToasterComponent } from '../dde-toaster/dde-toaster.component';
import { DdeMenuComponent } from '../dde-menu/dde-menu.component';
import { DdeDialogComponent } from '../dde-dialog/dde-dialog.component'
import { DdeCodeExplorerComponent } from '../dde-code-explorer/dde-code-explorer.component';
import { environment } from '../../environments/environment';
import { AnalyticsService } from '../../instrumentation/analytics';
import * as resources from '../../assets/resources/resources.json';

@Component({
  selector: 'dde-app',
  templateUrl: './dde-app.component.html',
  styleUrls: ['./dde-app.component.css']
})
export class DDEAppComponent implements OnInit {
  @ViewChild(DdeToasterComponent) private toasterComp: DdeToasterComponent;
  @ViewChild(DdeMenuComponent) private menuComp: DdeMenuComponent;
  @ViewChild(DdeDialogComponent) private dialogComp: DdeDialogComponent;
  @ViewChild(DdeCodeExplorerComponent) private codeExplorerComp: DdeCodeExplorerComponent;

  title = 'app';

  private apiId: string = '';
  private dashboardApi: any = null;
  private code_snippet: CodeSnippet;
  private session : Session = null;
  private toaster: Toaster;
  private message : string;
  private dashboardColSize: string = 'col-md-6 dashboard-min';
  private dashboardBarColSize: string = 'dashboard-bar-min';
  private explorerBarColSize: string = 'explorer-bar-max';
  private showPanel: boolean = true;
  private disableDashboardBarButtons: boolean = true;
  private showHideClass : string = 'side-panels-show';
  private buttonState : string = '';
  private showHideText: string = 'Hide Panels';

  constructor(private codeSnippetsRepoService: CodeSnippetsRepoService, private analyticsService: AnalyticsService) {
  }

  ngOnInit() {
  this.analyticsService.loadPage((<any>resources).categoryValue, (<any>resources).devPageName);
  //window.bluemixAnalytics.pageEvent((<any>resources).categoryValue, (<any>resources).devPageName);

    if (!environment.production) {
      console.log('Development Mode');
    } else {
      console.log('Production Mode');
    }
  }

  showPanels() {
    this.showPanel = !this.showPanel;
    this.showHideText = this.showPanel ? 'Hide Panels' : 'Show Panels';
    this.buttonState = this.showPanel ? '' : 'button-selected';
    this.showHideClass = this.showPanel ? 'side-panels-show' : 'side-panels-hide';
    this.dashboardColSize = this.showPanel ? 'col-md-6 dashboard-min' : 'col-md-12 dashboard-max';
    this.explorerBarColSize = this.showPanel ? 'explorer-bar-max' : 'explorer-bar-min';
    this.dashboardBarColSize = this.showPanel ? 'dashboard-bar-min' : 'dashboard-bar-max';
  }

  showVideo() {
    this.dialogComp.showModal();
  }

  sessionInfo(event) {
    this.session = event;

    if (this.session !== null) {
      this.setToaster((<any>resources).actions.createdSession.message, 'success', true);
      this.menuComp.nextStep = CodeSnippetEnum.CreateAPIFramework;
    }
    else {
      this.setToaster((<any>resources).errorMessage, 'failure', true);
    }
  }

  getAPIId(event) {
    this.apiId = event;

    if (this.apiId !== null && this.apiId !== '') {
      this.setToaster((<any>resources).actions.initializedSession.message, 'success', true);
      this.menuComp.nextStep = CodeSnippetEnum.CreateDashboard;
    }
    else {
      this.setToaster((<any>resources).errorMessage, 'failure', true);
    }
  }

  getDashboardApi(event) {
    this.dashboardApi = event;

    if (this.dashboardApi.apiId !== '' && this.dashboardApi.apiId !== null) {
      this.menuComp.nextStep = CodeSnippetEnum.AddCSVSource;
      this.disableDashboardBarButtons = false;
      this.dashboardApi.on("addSource:clicked", () => {
        this.menuComp.currentSelection = CodeSnippetEnum.AddCSVSource;
        this.code_snippet = this.codeSnippetsRepoService.getSnippet(CodeSnippetEnum.AddCSVSource);
      });
    }
    else {
      this.setToaster((<any>resources).errorMessage, 'failure', true);
    }
  }

  getDashboardSpec(event) {
    this.setToaster((<any>resources).actions.getSpecs.message, 'success', true);
  }

  updateModuleDefinitions(event) {
    this.setToaster((<any>resources).actions.updateDataDefinition.message, 'success', true);
  }

  clearDirtyState(event) {
    this.setToaster((<any>resources).actions.clearDirtyState.message, 'success', true);
  }

  registerCallback(event) {
    this.setToaster((<any>resources).actions.registerDashboardCallback.message, 'success', true);
  }

  unregisterCallback(event) {
    this.setToaster((<any>resources).actions.unregisterDashboardCallback.message, 'success', true);
  }

  registerApiCallback(event) {
    this.setToaster((<any>resources).actions.registeredApiCallback.message, 'success', true);
  }

  unregisterApiCallback(event) {
    this.setToaster((<any>resources).actions.unregisteredApiCallback.message, 'success', true);
  }

  closeApiFramework(event) {
    this.setToaster((<any>resources).actions.closedAPIFramework.message, 'success', true);
  }

  // set the code snippt to what was fired over
  getCodeSnippet(event) {
    this.code_snippet = event;
  }

  setToaster(message: string, cssclass: string, showToaster: boolean) {
    this.toaster = new Toaster(message, cssclass, showToaster);
    this.toasterComp.showToaster(this.toaster);
  }

  runCode() {
    this.codeExplorerComp.runCode();
  }

  onDisableRunButton() {
    let disableButton = this.code_snippet ? this.code_snippet.disableRun : false;
    let classes =  {
        disabled: disableButton,
        enabled: !disableButton
    };
    return classes;
  }

  isRunButtonDisabledAria(){
    let disableButton = this.code_snippet ? this.code_snippet.disableRun : false;
    return disableButton;
  }

  onDisableCopyButton() {
    let disableButton = this.code_snippet && this.code_snippet.selection === CodeSnippetEnum.None ?
                        true : false;
    let classes =  {
        disabled: disableButton,
        enabled: !disableButton
    };
    return classes;
  }

  isCopyButtonDisabledAria() {
    let disableButton = this.code_snippet && this.code_snippet.selection === CodeSnippetEnum.None ?
                        true : false;
    return disableButton;
  }

}
