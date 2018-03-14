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
        actionName = this.analyticsService.events.APIFramework;
        this.sessionObject = await this.ddeApiService.createNewSession();
        this.session.emit(this.sessionObject);
        this.resetAllRunButtons();
        this.analyticsService.setSession(this.sessionObject.id, this.sessionObject.code);
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.CreateAPIFramework) {
        actionName = this.analyticsService.events.APIFramework;
        this.apiId.emit(await this.ddeApiService.createAndInitApiFramework());
        this.resetAllRunButtons();
        this.enableRunButton(CodeSnippetEnum.CreateDashboard);
        this.enableRunButton(CodeSnippetEnum.OpenDashboard);
        this.enableRunButton(CodeSnippetEnum.RegisterApiCallback);
        this.enableRunButton(CodeSnippetEnum.UnregisterApiCallback);
        this.enableRunButton(CodeSnippetEnum.CloseApiFramework);
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.RegisterApiCallback) {
        actionName = this.analyticsService.events.APIFramework;
        this.ddeApiService.registerApiCallback();
        this.registerApiCallback.emit();
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.UnregisterApiCallback) {
        actionName = this.analyticsService.events.APIFramework;
        this.ddeApiService.unregisterApiCallback();
        this.unregisterApiCallback.emit();
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.CloseApiFramework) {
        actionName = this.analyticsService.events.APIFramework;
        this.ddeApiService.closeApiFramework();
        this.closeApiFramework.emit();
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.CreateDashboard) {
        actionName = this.analyticsService.events.DashboardFactory;
        this.dashboardApi.emit(await this.ddeApiService.createDashboard());
        this.enableDashboardInteractionRunButton();
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.OpenDashboard) {
        actionName = this.analyticsService.events.DashboardFactory;
        this.dashboardApi.emit(await this.ddeApiService.openDashboard());
        this.enableDashboardInteractionRunButton();
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.AddCSVSource) {
        actionName = this.analyticsService.events.DashboardAPI;
        dataSource = await this.ddeApiService.addCSVSampleSource();
        this.ddeActionService.isAddingDataSourceLastUpdateToDashboard = true;
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.AddProtectedCSVSource) {
        actionName = this.analyticsService.events.DashboardAPI;
        dataSource = await this.ddeApiService.addProtectedCSVSampleSource();
        this.ddeActionService.isAddingDataSourceLastUpdateToDashboard = true ;
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.AddBikeShareRidesDemographCSVSource) {
        actionName = this.analyticsService.events.DashboardAPI;
        dataSource = await this.ddeApiService.addBikeShareRidesDemographCSVSampleSource();
        this.ddeActionService.isAddingDataSourceLastUpdateToDashboard = true;
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.AddBikeShareWeatherCSVSource) {
        actionName = this.analyticsService.events.DashboardAPI;
        dataSource = await this.ddeApiService.addBikeShareWeatherCSVSampleSource();
        this.ddeActionService.isAddingDataSourceLastUpdateToDashboard = true;
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.DashboardEditMode) {
        actionName = this.analyticsService.events.DashboardAPI;
        this.ddeApiService.setDashboardMode_Edit();
        this.ddeActionService.isAddingDataSourceLastUpdateToDashboard = false;
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.DashboardViewMode) {
        actionName = this.analyticsService.events.DashboardAPI;
        this.ddeApiService.setDashboardMode_View();
        this.ddeActionService.isAddingDataSourceLastUpdateToDashboard = false;
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.DashboardEditGroupMode) {
        actionName = this.analyticsService.events.DashboardAPI;
        this.ddeApiService.setDashboardMode_EditGroup();
        this.ddeActionService.isAddingDataSourceLastUpdateToDashboard = false;
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.UndoLastAction) {
        actionName = this.analyticsService.events.DashboardAPI;
        this.ddeApiService.undoLastAction();
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.RedoLastAction) {
        actionName = this.analyticsService.events.DashboardAPI;
        this.ddeApiService.redoLastAction();
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.TogglePropertiesPane) {
        actionName = this.analyticsService.events.DashboardAPI;
        this.ddeApiService.togglePropertiesPane();
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.GetDashboardSpec) {
        actionName = this.analyticsService.events.SupportAPI;
        await this.ddeApiService.getDashboardSpec();
        this.dashboardSpec.emit();
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.UpdateModuleDefinitions) {
        actionName = this.analyticsService.events.SupportAPI;
        this.ddeApiService.updateModuleDefinitions();
        this.updateModuleDefinitions.emit();
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.ClearDirtyState) {
        actionName = this.analyticsService.events.SupportAPI;
        this.ddeApiService.clearDirtyState();
        this.clearDirtyState.emit();
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.RegisterCallback) {
        actionName = this.analyticsService.events.SupportAPI;
        this.ddeApiService.registerCallback();
        this.registerCallback.emit();
      }
      else if (this.codeSnippet.selection === CodeSnippetEnum.UnregisterCallback) {
        actionName = this.analyticsService.events.SupportAPI;
        this.ddeApiService.unregisterCallback();
        this.unregisterCallback.emit();
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
