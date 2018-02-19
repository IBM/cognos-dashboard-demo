import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CodeSnippetEnum, CodeSnippet } from '../../model/code-snippet';
import { Session } from '../../model/session';
import { Toaster } from '../../model/toaster';
import { CodeSnippetsRepoService } from '../services/code-snippets-repo.service';
import { DdeToasterComponent } from '../dde-toaster/dde-toaster.component';
import { DdeMenuComponent } from '../dde-menu/dde-menu.component';
import { DdeDialogComponent } from '../dde-dialog/dde-dialog.component'
import { DdeCodeExplorerComponent } from '../dde-code-explorer/dde-code-explorer.component';
import { environment } from '../../environments/environment';

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
  private dashboardColSize: string = 'col-md-6 dashbaord-min';
  private dashboardBarColSize: string = 'col-md-6';
  private explorerBarColSize: string = 'col-md-6';
  private showPanel: boolean = true;
  private disableDashboardBarButtons: boolean = true;
  //private showHideClass : string = 'show';
  private showHideClass : string = 'side-panels-show';
  private buttonState : string = '';

  constructor(private codeSnippetsRepoService: CodeSnippetsRepoService) {
  }

  ngOnInit() {
    if (!environment.production) {
      console.log('Development Mode');
    } else {
      console.log('Production Mode');
    }
  }

  showPanels() {
    this.showPanel = !this.showPanel;
    this.buttonState = this.showPanel ? '' : 'button-selected';
    //this.showHideClass = this.showPanel ? 'show' : 'hide';
    this.showHideClass = this.showPanel ? 'side-panels-show' : 'side-panels-hide';
    this.dashboardColSize = this.showPanel ? 'col-md-6 dashbaord-min' : 'col-md-12 dashbaord-max';
    this.explorerBarColSize = this.showPanel ? 'col-md-6' : 'col-md-1';
    this.dashboardBarColSize = this.showPanel ? 'col-md-6' : 'col-md-11';
  }

  showVideo() {
    this.dialogComp.showModal();
  }

  sessionInfo(event) {
    this.session = event;

    if (this.session !== null) {
      this.message = 'Session created successfully. Next, create and initialize the API framework.';
      this.setToaster(this.message, 'success', true);
      this.menuComp.nextStep = CodeSnippetEnum.CreateAPIFramework;
    }
    else {
      this.message = 'An error has occured. Please check the console log for more details.';
      this.setToaster(this.message, 'failure', true);
    }
  }

  getAPIId(event) {
    this.apiId = event;

    if (this.apiId !== '') {
      this.message = 'API created successfully. You can now create or open a dashboard.';
      this.setToaster(this.message, 'success', true);
      this.menuComp.nextStep = CodeSnippetEnum.CreateDashboard;
    }
    else {
      this.message = 'An error has occured. Please check the console log for more details.';
      this.setToaster(this.message, 'failure', true);
    }
  }

  getDashboardApi(event) {
    this.dashboardApi = event;

    if (this.dashboardApi !== '') {
      this.menuComp.nextStep = CodeSnippetEnum.AddCSVSource;
      this.disableDashboardBarButtons = false;
      this.dashboardApi.on("addSource:clicked", () => {
        this.menuComp.currentSelection = CodeSnippetEnum.AddCSVSource;
        this.code_snippet = this.codeSnippetsRepoService.getSnippet(CodeSnippetEnum.AddCSVSource);
      });
    }
    else {
      this.message = 'An error has occured. Please check the console log for more details.';
      this.setToaster(this.message, 'failure', true);
    }
  }

  getDashboardSpec(event) {
    this.message = 'Dashboard spec retrieved successfully. See console for details.';
    this.setToaster(this.message, 'success', true);
  }

  updateModuleDefinitions(event) {
    this.message = 'Module Definitions updated successfully. See console for details.';
    this.setToaster(this.message, 'success', true);
  }

  clearDirtyState(event) {
    this.message = 'Dirty State cleared successfully. See console for details.';
    this.setToaster(this.message, 'success', true);
  }

  registerCallback(event) {
    this.message = 'Callback registered successfully. See console for details.';
    this.setToaster(this.message, 'success', true);
  }

  unregisterCallback(event) {
    this.message = 'Callback unregistered successfully. See console for details.';
    this.setToaster(this.message, 'success', true);
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

}
