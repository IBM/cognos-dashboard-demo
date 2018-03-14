import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DdeApiService } from '../services/dde-api.service';
import { DdeActionService } from '../services/dde-action.service';
import { Session } from '../../model/session';
import { CodeSnippet, CodeSnippetEnum } from '../../model/code-snippet';
import { CSVDataSource, ProtectedCSVDataSource, BikeShareWeatherCSVSource, BikeShareRidesDemographCSVSource } from '../../model/data-source';
import { CodeSnippetsRepoService } from '../services/code-snippets-repo.service';
import * as DashboardMode from '../../model/dashboard-mode';
import { AnalyticsService } from '../../instrumentation/analytics';
declare var Prism: any;

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
      Prism.highlightAll();
      let classes =  {
          divsmall: this.codeSnippet && this.codeSnippet.size === 'small',
          divlarge: !this.codeSnippet || this.codeSnippet.size === 'large'
      };
      return classes;
  }

  async runCode() {
    let dataSource: string = '';
    let actionName = '';

    try {
      this.ddeActionService.previousAction = this.ddeActionService.currentAction;
      this.ddeActionService.currentAction = this.codeSnippet.selection;

      if (this.codeSnippet.selection === CodeSnippetEnum.CreateSession) {
        this.sessionObject = await this.ddeApiService.createNewSession();
        this.session.emit(this.sessionObject);
        this.resetAllRunButtons();
        this.analyticsService.setSession(this.sessionObject.id, this.sessionObject.code);
        actionName = this.analyticsService.events.APIFramework;
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.CreateAPIFramework) {
        this.apiId.emit(await this.ddeApiService.createAndInitApiFramework());
        this.resetAllRunButtons();
        this.enableRunButton(CodeSnippetEnum.CreateDashboard);
        this.enableRunButton(CodeSnippetEnum.OpenDashboard);
        actionName = this.analyticsService.events.APIFramework;
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.CreateDashboard) {
        this.dashboardApi.emit(await this.ddeApiService.createDashboard());
        this.enableDashboardInteractionRunButton();
        actionName = this.analyticsService.events.DashboardFactory;
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.OpenDashboard) {
        this.dashboardApi.emit(await this.ddeApiService.openDashboard());
        this.enableDashboardInteractionRunButton();
        actionName = this.analyticsService.events.DashboardFactory;
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.AddCSVSource) {
        dataSource = await this.ddeApiService.addCSVSampleSource();
        this.ddeActionService.isAddingDataSourceLastUpdateToDashboard = true;
        actionName = this.analyticsService.events.DashboardAPI;
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.AddProtectedCSVSource) {
        dataSource = await this.ddeApiService.addProtectedCSVSampleSource();
        this.ddeActionService.isAddingDataSourceLastUpdateToDashboard = true ;
        actionName = this.analyticsService.events.DashboardAPI;
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.AddBikeShareRidesDemographCSVSource) {
        dataSource = await this.ddeApiService.addBikeShareRidesDemographCSVSampleSource();
        this.ddeActionService.isAddingDataSourceLastUpdateToDashboard = true;
        actionName = this.analyticsService.events.DashboardAPI;
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.AddBikeShareWeatherCSVSource) {
        dataSource = await this.ddeApiService.addBikeShareWeatherCSVSampleSource();
        this.ddeActionService.isAddingDataSourceLastUpdateToDashboard = true;
        actionName = this.analyticsService.events.DashboardAPI;
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.DashboardEditMode) {
        this.ddeApiService.setDashboardMode_Edit();
        this.ddeActionService.isAddingDataSourceLastUpdateToDashboard = false;
        actionName = this.analyticsService.events.DashboardAPI;
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.DashboardViewMode) {
        this.ddeApiService.setDashboardMode_View();
        this.ddeActionService.isAddingDataSourceLastUpdateToDashboard = false;
        actionName = this.analyticsService.events.DashboardAPI;
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.DashboardEditGroupMode) {
        this.ddeApiService.setDashboardMode_EditGroup();
        this.ddeActionService.isAddingDataSourceLastUpdateToDashboard = false;
        actionName = this.analyticsService.events.DashboardAPI;
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.UndoLastAction) {
        this.ddeApiService.undoLastAction();
        actionName = this.analyticsService.events.DashboardAPI;
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.RedoLastAction) {
        this.ddeApiService.redoLastAction();
        actionName = this.analyticsService.events.DashboardAPI;
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.TogglePropertiesPane) {
        this.ddeApiService.togglePropertiesPane();
        actionName = this.analyticsService.events.DashboardAPI;
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.GetDashboardSpec) {
        await this.ddeApiService.getDashboardSpec();
        this.dashboardSpec.emit();
        actionName = this.analyticsService.events.SupportAPI;
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.UpdateModuleDefinitions) {
        this.ddeApiService.updateModuleDefinitions();
        this.updateModuleDefinitions.emit();
        actionName = this.analyticsService.events.SupportAPI;
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.ClearDirtyState) {
        this.ddeApiService.clearDirtyState();
        this.clearDirtyState.emit();
        actionName = this.analyticsService.events.SupportAPI;
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.RegisterCallback) {
        this.ddeApiService.registerCallback();
        this.registerCallback.emit();
        actionName = this.analyticsService.events.SupportAPI;
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.UnregisterCallback) {
        this.ddeApiService.unregisterCallback();
        this.unregisterCallback.emit();
        actionName = this.analyticsService.events.SupportAPI;
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.RegisterApiCallback) {
        this.ddeApiService.registerApiCallback();
        this.registerApiCallback.emit();
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.UnregisterApiCallback) {
        this.ddeApiService.unregisterApiCallback();
        this.unregisterApiCallback.emit();
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.CloseApiFramework) {
        this.ddeApiService.closeApiFramework();
        this.closeApiFramework.emit();
      }
      else {
        throw new Error("Invalid code snippet selection");
      }

      this.createTraits(actionName, true, dataSource, 'Successfully ' + this.codeSnippet.selection);
      this.ddeActionService.hasActionChanged.next(true); ;
    }
    catch(e) {
      console.log(e);
      this.session.emit(null);
      this.apiId.emit('');
      this.createTraits(actionName, false, dataSource, e.message);
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
    this.enableRunButton(CodeSnippetEnum.RegisterApiCallback);
    this.enableRunButton(CodeSnippetEnum.UnregisterApiCallback);
    this.enableRunButton(CodeSnippetEnum.CloseApiFramework);
  }

  createTraits(actionName: string, isSuccess: boolean, dataSource: string, message: string) {
    let result = isSuccess ? 'success' : 'error';

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
        this.analyticsService.trackAPIAndDashboard(actionName, this.codeSnippet.selection, result, message);
        break;
      }
      case CodeSnippetEnum.UndoLastAction:
      case CodeSnippetEnum.RedoLastAction:
      case CodeSnippetEnum.TogglePropertiesPane:
      case CodeSnippetEnum.DashboardEditMode:
      case CodeSnippetEnum.DashboardViewMode:
      case CodeSnippetEnum.DashboardEditGroupMode: {
        this.analyticsService.trackDashboardInteraction(actionName, this.codeSnippet.selection, result, message, null, 'Run Button');
        break;
      }
      case CodeSnippetEnum.AddCSVSource:
      case CodeSnippetEnum.AddProtectedCSVSource:
      case CodeSnippetEnum.AddBikeShareRidesDemographCSVSource:
      case CodeSnippetEnum.AddBikeShareWeatherCSVSource:
      case CodeSnippetEnum.AddBikeShareRidesDemographCSVSource:
      case CodeSnippetEnum.AddBikeShareWeatherCSVSource:
      case CodeSnippetEnum.GetDashboardSpec: {
        this.analyticsService.trackDashboardInteraction(actionName, this.codeSnippet.selection, result, message, dataSource, 'Run Button');
        break;
      }
    }
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
