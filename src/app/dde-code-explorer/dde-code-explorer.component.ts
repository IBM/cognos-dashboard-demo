import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DdeApiService } from '../services/dde-api.service';
import { DdeActionService } from '../services/dde-action.service';
import { Session } from '../../model/session';
import { CodeSnippet, CodeSnippetEnum } from '../../model/code-snippet';
import { CSVDataSource, ProtectedCSVDataSource, BikeShareWeatherCSVSource, BikeShareRidesDemographCSVSource } from '../../model/data-source';
import { CodeSnippetsRepoService } from '../services/code-snippets-repo.service';
import * as DashboardMode from '../../model/dashboard-mode';
import { AnalyticsService } from '../../instrumentation/analytics';
import * as resources from '../../assets/resources/resources.json';
import { APIAndDashboardTraits } from '../../interfaces/apiAndDashboardTraits';
import { DashboardInteractionTraits } from '../../interfaces/dashboardInteractionTraits';

@Component({
  selector: 'dde-code-explorer',
  templateUrl: './dde-code-explorer.component.html',
  styleUrls: ['./dde-code-explorer.component.css']
})
export class DdeCodeExplorerComponent implements OnInit {
  @Output() session: EventEmitter<Session> = new EventEmitter<Session>();
  @Output() apiId: EventEmitter<string> = new EventEmitter<string>();
  @Output() dashboardApi: EventEmitter<string> = new EventEmitter<string>();
  @Output() dashboardSpec: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateModuleDefinitions: EventEmitter<void> = new EventEmitter<void>();
  @Output() clearDirtyState: EventEmitter<void> = new EventEmitter<void>();
  @Output() registerCallback: EventEmitter<void> = new EventEmitter<void>();
  @Output() unregisterCallback: EventEmitter<void> = new EventEmitter<void>();
  @Output() registerApiCallback: EventEmitter<void> = new EventEmitter<void>();
  @Output() unregisterApiCallback: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeApiFramework: EventEmitter<void> = new EventEmitter<void>();
  @Input() codeSnippet : CodeSnippet;
  dataSources = [CSVDataSource, ProtectedCSVDataSource, BikeShareWeatherCSVSource, BikeShareRidesDemographCSVSource ];
  dashboardModes = [DashboardMode.EditMode, DashboardMode.ViewMode, DashboardMode.EditGroupMode];
  sampleModule : string;
  sessionObject = null;

  constructor(private ddeApiService: DdeApiService, private codeSnippetsRepoService: CodeSnippetsRepoService,
              private ddeActionService: DdeActionService, private analyticsService: AnalyticsService) { }

  ngOnInit() {
  }

  setExplorerDiv() {
      let classes =  {
          divsmall: this.codeSnippet && this.codeSnippet.size === 'small',
          divlarge: !this.codeSnippet || this.codeSnippet.size === 'large'
      };
      return classes;
  }

  async runCode() {
    let dataSource: string = '';
    let actionResource: string = '';

    try {
      this.ddeActionService.previousAction = this.ddeActionService.currentAction;
      this.ddeActionService.currentAction = this.codeSnippet.selection;

      if (this.codeSnippet.selection === CodeSnippetEnum.CreateSession) {
        actionResource = (<any>resources).actions.createdSession;
        this.sessionObject = await this.ddeApiService.createNewSession();
        this.session.emit(this.sessionObject);
        this.resetAllRunButtons();
        this.analyticsService.setSession(this.sessionObject.id);
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.CreateAPIFramework) {
        actionResource = (<any>resources).actions.initializedSession;
        this.apiId.emit(await this.ddeApiService.createAndInitApiFramework());
        this.resetAllRunButtons();
        this.enableRunButton(CodeSnippetEnum.CreateDashboard);
        this.enableRunButton(CodeSnippetEnum.OpenDashboard);
        this.enableRunButton(CodeSnippetEnum.RegisterApiCallback);
        this.enableRunButton(CodeSnippetEnum.UnregisterApiCallback);
        this.enableRunButton(CodeSnippetEnum.CloseApiFramework);
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.RegisterApiCallback) {
        actionResource = (<any>resources).actions.registeredApiCallback;
        this.ddeApiService.registerApiCallback();
        this.registerApiCallback.emit();
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.UnregisterApiCallback) {
        actionResource = (<any>resources).actions.unregisteredApiCallback;
        this.ddeApiService.unregisterApiCallback();
        this.unregisterApiCallback.emit();
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.CloseApiFramework) {
        actionResource = (<any>resources).actions.closedAPIFramework;
        this.ddeApiService.closeApiFramework();
        this.closeApiFramework.emit();
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.CreateDashboard) {
        actionResource = (<any>resources).actions.createdNew;
        this.dashboardApi.emit(await this.ddeApiService.createDashboard());
        this.enableDashboardInteractionRunButton();
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.OpenDashboard) {
        actionResource = (<any>resources).actions.opened;
        this.dashboardApi.emit(await this.ddeApiService.openDashboard());
        this.enableDashboardInteractionRunButton();
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.AddCSVSource) {
        actionResource = (<any>resources).actions.addSource;
        dataSource = await this.ddeApiService.addCSVSampleSource();
        this.ddeActionService.isAddingDataSourceLastUpdateToDashboard = true;
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.AddProtectedCSVSource) {
        actionResource = (<any>resources).actions.addSource;
        dataSource = await this.ddeApiService.addProtectedCSVSampleSource();
        this.ddeActionService.isAddingDataSourceLastUpdateToDashboard = true ;
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.AddBikeShareRidesDemographCSVSource) {
        actionResource = (<any>resources).actions.addSource;
        dataSource = await this.ddeApiService.addBikeShareRidesDemographCSVSampleSource();
        this.ddeActionService.isAddingDataSourceLastUpdateToDashboard = true;
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.AddBikeShareWeatherCSVSource) {
        actionResource = (<any>resources).actions.addSource;
        dataSource = await this.ddeApiService.addBikeShareWeatherCSVSampleSource();
        this.ddeActionService.isAddingDataSourceLastUpdateToDashboard = true;
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.DashboardEditMode) {
        actionResource = (<any>resources).actions.editMode;
        this.ddeApiService.setDashboardMode_Edit();
        this.ddeActionService.isAddingDataSourceLastUpdateToDashboard = false;
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.DashboardViewMode) {
        actionResource = (<any>resources).actions.viewMode;
        this.ddeApiService.setDashboardMode_View();
        this.ddeActionService.isAddingDataSourceLastUpdateToDashboard = false;
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.DashboardEditGroupMode) {
        actionResource = (<any>resources).actions.groupEditMode;
        this.ddeApiService.setDashboardMode_EditGroup();
        this.ddeActionService.isAddingDataSourceLastUpdateToDashboard = false;
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.UndoLastAction) {
        actionResource = (<any>resources).actions.undo;
        this.ddeApiService.undoLastAction();
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.RedoLastAction) {
        actionResource = (<any>resources).actions.redo;
        this.ddeApiService.redoLastAction();
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.TogglePropertiesPane) {
        actionResource = (<any>resources).actions.toggleProperties;
        this.ddeApiService.togglePropertiesPane();
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.GetDashboardSpec) {
        actionResource = (<any>resources).actions.getSpecs;
        await this.ddeApiService.getDashboardSpec();
        this.dashboardSpec.emit();
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.UpdateModuleDefinitions) {
        actionResource = (<any>resources).actions.updateDataDefinition;
        this.ddeApiService.updateModuleDefinitions();
        this.updateModuleDefinitions.emit();
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.ClearDirtyState) {
        actionResource = (<any>resources).actions.clearDirtyState;
        this.ddeApiService.clearDirtyState();
        this.clearDirtyState.emit();
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.RegisterCallback) {
        actionResource = (<any>resources).actions.registerDashboardCallback;
        this.ddeApiService.registerCallback();
        this.registerCallback.emit();
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.UnregisterCallback) {
        actionResource = (<any>resources).actions.unregisterDashboardCallback;
        this.ddeApiService.unregisterCallback();
        this.unregisterCallback.emit();
      }
      else {
        throw new Error((<any>resources).invalidCodeSnippet);
      }

      this.createTraits((<any>actionResource).processType, (<any>actionResource).name, true, dataSource, (<any>actionResource).message);
      this.ddeActionService.hasActionChanged.next(true); ;
    }
    catch(e) {
      console.log(e);
      this.session.emit(null);
      this.apiId.emit('');
      this.createTraits((<any>actionResource).processType, (<any>actionResource).name, false, dataSource, e.message);
    }
  }

  enableDashboardInteractionRunButton() {
    this.enableRunButton(CodeSnippetEnum.AddCSVSource);
    this.enableRunButton(CodeSnippetEnum.AddProtectedCSVSource);
    this.enableRunButton(CodeSnippetEnum.AddBikeShareRidesDemographCSVSource);
    this.enableRunButton(CodeSnippetEnum.AddBikeShareWeatherCSVSource);
    this.enableRunButton(CodeSnippetEnum.DashboardEditMode);
    this.enableRunButton(CodeSnippetEnum.DashboardViewMode);
    this.enableRunButton(CodeSnippetEnum.DashboardEditGroupMode);
    this.enableRunButton(CodeSnippetEnum.UndoLastAction);
    this.enableRunButton(CodeSnippetEnum.RedoLastAction);
    this.enableRunButton(CodeSnippetEnum.TogglePropertiesPane);
    this.enableRunButton(CodeSnippetEnum.GetDashboardSpec);
    this.enableRunButton(CodeSnippetEnum.ClearDirtyState);
    this.enableRunButton(CodeSnippetEnum.RegisterCallback);
    this.enableRunButton(CodeSnippetEnum.UnregisterCallback);
  }

  createTraits(processType: string, process: string, isSuccess: boolean, dataSource: string, resultValue: string) {
    let result = isSuccess ? 'success' : 'error';
    let traits : APIAndDashboardTraits | DashboardInteractionTraits;

    switch(this.codeSnippet.selection) {
      case CodeSnippetEnum.CreateSession:
      case CodeSnippetEnum.CreateAPIFramework:
      case CodeSnippetEnum.OpenDashboard:
      case CodeSnippetEnum.CreateDashboard:
      case CodeSnippetEnum.ClearDirtyState:
      case CodeSnippetEnum.RegisterCallback:
      case CodeSnippetEnum.UnregisterCallback:
      case CodeSnippetEnum.RegisterApiCallback:
      case CodeSnippetEnum.UnregisterApiCallback:
      case CodeSnippetEnum.CloseApiFramework: {
        traits = {processType: processType, process: process, sessionId: this.analyticsService.sessionId, successFlag: result,
                  resultValue: resultValue, productTitle: (<any>resources).productTitle, /*version: environment.version*/};

        break;
      }
      case CodeSnippetEnum.UndoLastAction:
      case CodeSnippetEnum.RedoLastAction:
      case CodeSnippetEnum.TogglePropertiesPane:
      case CodeSnippetEnum.DashboardEditMode:
      case CodeSnippetEnum.DashboardViewMode:
      case CodeSnippetEnum.DashboardEditGroupMode: {
        traits = {processType: processType, process: process, sessionId: this.analyticsService.sessionId, successFlag: result,
                  resultValue: resultValue, productTitle: (<any>resources).productTitle, /*version: environment.version,*/ uiElement: (<any>resources).runButton };
        break;
      }
      case CodeSnippetEnum.AddCSVSource:
      case CodeSnippetEnum.AddProtectedCSVSource:
      case CodeSnippetEnum.AddBikeShareRidesDemographCSVSource:
      case CodeSnippetEnum.AddBikeShareWeatherCSVSource:
      case CodeSnippetEnum.AddBikeShareRidesDemographCSVSource:
      case CodeSnippetEnum.AddBikeShareWeatherCSVSource:
      case CodeSnippetEnum.GetDashboardSpec: {
        traits = {processType: processType, process: process, sessionId: this.analyticsService.sessionId, successFlag: result,
                  resultValue: resultValue, productTitle: (<any>resources).productTitle, /*version: environment.version,*/ customName1: 'dataSource',
                  customValue1: dataSource, uiElement: (<any>resources).runButton};
        break;
      }
    }

    this.analyticsService.sendTrack((<any>resources).ranProcessTrack, traits);
  }

  enableRunButton(type: CodeSnippetEnum) {
    let snippet = this.codeSnippetsRepoService.getSnippet(type);
    snippet.disableRun = false;
    this.codeSnippetsRepoService.setSnippet(type, snippet);
  }

  resetAllRunButtons() {
    this.codeSnippetsRepoService.disableRunButton();
    this.enableRunButton(CodeSnippetEnum.CreateAPIFramework);
  }

  onSelect(sourceValue) {
    for (var i = 0; i < this.dataSources.length; i++) {
      if (this.dataSources[i].value === sourceValue) {
        this.codeSnippet = this.codeSnippetsRepoService.getSnippet(sourceValue);
      }
    }
  }

  onSelectMode(modeValue) {
    for (var i = 0; i < this.dashboardModes.length; i++) {
      if (this.dashboardModes[i].value === modeValue) {
        this.codeSnippet = this.codeSnippetsRepoService.getSnippet(modeValue);
      }
    }
  }

  showSessionPanel() {
    return this.codeSnippet && (this.codeSnippet.selection === CodeSnippetEnum.CreateAPIFramework);
  }

  showSourcesDropDown() {
    return this.codeSnippet && (this.codeSnippet.selection === CodeSnippetEnum.AddCSVSource ||
          this.codeSnippet.selection === CodeSnippetEnum.AddProtectedCSVSource ||
          this.codeSnippet.selection === CodeSnippetEnum.AddBikeShareWeatherCSVSource ||
          this.codeSnippet.selection === CodeSnippetEnum.AddBikeShareRidesDemographCSVSource);
  }

  showDashboardModesDropDown() {
    return this.codeSnippet && (this.codeSnippet.selection === CodeSnippetEnum.DashboardViewMode ||
          this.codeSnippet.selection === CodeSnippetEnum.DashboardEditMode ||
          this.codeSnippet.selection === CodeSnippetEnum.DashboardEditGroupMode);
  }
}
