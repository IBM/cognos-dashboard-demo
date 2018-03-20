import { Component, OnInit, Input } from '@angular/core';
import { DdeApiService } from '../services/dde-api.service';
import { DdeActionService } from '../services/dde-action.service';
import { CodeSnippetEnum } from '../../model/code-snippet';
import * as DashboardMode from '../../model/dashboard-mode';
import { AnalyticsService } from '../../instrumentation/analytics';
import * as resources from '../../assets/resources/resources.json';
import { DashboardInteractionTraits } from '../../interfaces/dashboardInteractionTraits';

@Component({
  selector: 'dde-dashboard-bar',
  templateUrl: './dde-dashboard-bar.component.html',
  styleUrls: ['./dde-dashboard-bar.component.css']
})
export class DdeDashboardBarComponent implements OnInit {
  @Input() disableButtons : boolean;
  private isEditMode : boolean = false;
  private toggleProperties : boolean = false;
  traits: DashboardInteractionTraits;

  constructor(private ddeApiService: DdeApiService, private ddeActionService: DdeActionService,
              private analyticsService: AnalyticsService) { }

  ngOnInit() {
    this.ddeActionService.hasActionChanged.subscribe(() => {
      this.shouldReset();
      this.toggleDashboardMode();
      this.togglePropertiesMode();
    })
  }

  isTogglePropertiesPaneDisabled() {
    return this.disableButtons || !this.isEditMode;
  }

  onDisableButtons() {
    let classes =  {
        disabled: this.disableButtons,
        enabled: !this.disableButtons
    };
    return classes;
  }

  undoLastAction() {
    this.traits = {processType: (<any>resources).actions.undo.processType, process: (<any>resources).actions.undo.name,
              sessionId: this.analyticsService.sessionId, successFlag: 'success', resultValue: (<any>resources).actions.undo.message, productTitle: (<any>resources).productTitle,
               /*version: environment.version,*/ uiElement: (<any>resources).actionButton };

    this.ddeApiService.undoLastAction();
    this.ddeActionService.previousAction = this.ddeActionService.currentAction;
    this.ddeActionService.currentAction = CodeSnippetEnum.UndoLastAction;
    this.toggleDashboardMode();
    this.analyticsService.trackDashboardInteraction((<any>resources).ranProcessTrack, this.traits);
  }

  redoLastAction() {
    this.traits = { processType: (<any>resources).actions.redo.processType, process: (<any>resources).actions.redo.name,
              sessionId: this.analyticsService.sessionId, successFlag: 'success', resultValue: (<any>resources).actions.redo.message, productTitle: (<any>resources).productTitle,
               /*version: environment.version,*/ uiElement: (<any>resources).actionButton };

    this.ddeApiService.redoLastAction();
    this.ddeActionService.previousAction = this.ddeActionService.currentAction;
    this.ddeActionService.currentAction = CodeSnippetEnum.RedoLastAction;
    this.toggleDashboardMode();
    this.analyticsService.trackDashboardInteraction((<any>resources).ranProcessTrack, this.traits);
  }

  togglePropertiesPane() {
    this.traits = {processType: (<any>resources).actions.toggleProperties.processType, process: (<any>resources).actions.toggleProperties.name,
              sessionId: this.analyticsService.sessionId, successFlag: 'success', resultValue: (<any>resources).actions.toggleProperties.message, productTitle: (<any>resources).productTitle,
               /*version: environment.version,*/ uiElement: (<any>resources).actionButton };

    this.ddeActionService.previousAction = this.ddeActionService.currentAction;
    this.ddeActionService.currentAction = CodeSnippetEnum.TogglePropertiesPane;
    this.ddeApiService.togglePropertiesPane();
    this.togglePropertiesMode();
    this.analyticsService.trackDashboardInteraction((<any>resources).ranProcessTrack, this.traits);
  }

  editDashboard() {
    this.ddeActionService.previousAction = this.ddeActionService.currentAction;
    this.ddeActionService.isAddingDataSourceLastUpdateToDashboard = false;

    if (this.isEditMode) {
      this.traits = {processType: (<any>resources).actions.viewMode.processType, process: (<any>resources).actions.viewMode.name,
                sessionId: this.analyticsService.sessionId, successFlag: 'success', resultValue: (<any>resources).actions.viewMode.message, productTitle: (<any>resources).productTitle,
                 /*version: environment.version,*/ uiElement: (<any>resources).actionButton };

      this.ddeActionService.currentAction = CodeSnippetEnum.DashboardViewMode;
      this.ddeApiService.setDashboardMode_View();
      this.toggleProperties = false;
      this.analyticsService.trackDashboardInteraction((<any>resources).ranProcessTrack, this.traits);
    }
    else {
      this.traits = {processType: (<any>resources).actions.editMode.processType, process: (<any>resources).actions.editMode.name,
                sessionId: this.analyticsService.sessionId, successFlag: 'success', resultValue: (<any>resources).actions.editMode.message, productTitle: (<any>resources).productTitle,
                 /*version: environment.version,*/ uiElement: (<any>resources).actionButton };

      this.ddeActionService.currentAction = CodeSnippetEnum.DashboardEditMode;
      this.ddeApiService.setDashboardMode_Edit();
      this.analyticsService.trackDashboardInteraction((<any>resources).ranProcessTrack, this.traits);
    }

    this.toggleDashboardMode();
  }

  toggleDashboardMode() {
    if (this.ddeActionService.shouldToggleEditButton()) {
      this.isEditMode = !this.isEditMode;
    }
  }

  togglePropertiesMode()  {
    if (this.ddeActionService.shouldTogglePropertiesPane() && !this.isTogglePropertiesPaneDisabled()) {
      this.toggleProperties = !this.toggleProperties;
    }
  }

  shouldReset() {
    if (this.ddeActionService.currentAction === CodeSnippetEnum.CreateDashboard) {
      this.isEditMode = true;
      this.toggleProperties = false;
    }

    if (this.ddeActionService.currentAction === CodeSnippetEnum.OpenDashboard) {
      this.isEditMode = false;
      this.toggleProperties = false;
    }

  }
}
