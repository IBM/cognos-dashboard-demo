import { Component, OnInit, Input } from '@angular/core';
import { DdeApiService } from '../services/dde-api.service';
import { DdeActionService } from '../services/dde-action.service';
import { CodeSnippetEnum } from '../../model/code-snippet';
import * as DashboardMode from '../../model/dashboard-mode';
import { AnalyticsService } from '../../instrumentation/analytics';
import * as resources from '../../assets/resources/resources.json';

@Component({
  selector: 'dde-dashboard-bar',
  templateUrl: './dde-dashboard-bar.component.html',
  styleUrls: ['./dde-dashboard-bar.component.css']
})
export class DdeDashboardBarComponent implements OnInit {
  @Input() disableButtons : boolean;
  private isEditMode : boolean = false;
  private toggleProperties : boolean = false;

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
    this.ddeApiService.undoLastAction();
    this.ddeActionService.previousAction = this.ddeActionService.currentAction;
    this.ddeActionService.currentAction = CodeSnippetEnum.UndoLastAction;
    this.toggleDashboardMode();
    this.analyticsService.trackDashboardInteraction((<any>resources).actions.undo.eventName, (<any>resources).actions.undo.name, 'success', (<any>resources).actions.undo.message, null, (<any>resources).actionButton);
  }

  redoLastAction() {
    this.ddeApiService.redoLastAction();
    this.ddeActionService.previousAction = this.ddeActionService.currentAction;
    this.ddeActionService.currentAction = CodeSnippetEnum.RedoLastAction;
    this.toggleDashboardMode();
    this.analyticsService.trackDashboardInteraction((<any>resources).actions.redo.eventName, (<any>resources).actions.redo.name, 'success', (<any>resources).actions.redo.message, null, (<any>resources).actionButton);
  }

  togglePropertiesPane() {
    this.ddeActionService.previousAction = this.ddeActionService.currentAction;
    this.ddeActionService.currentAction = CodeSnippetEnum.TogglePropertiesPane;
    this.ddeApiService.togglePropertiesPane();
    this.togglePropertiesMode();
    this.analyticsService.trackDashboardInteraction((<any>resources).actions.toggleProperties.eventName, (<any>resources).actions.toggleProperties.name, 'success', (<any>resources).actions.toggleProperties.message, null, (<any>resources).actionButton);
  }

  editDashboard() {
    this.ddeActionService.previousAction = this.ddeActionService.currentAction;
    this.ddeActionService.isAddingDataSourceLastUpdateToDashboard = false;

    if (this.isEditMode) {
      this.ddeActionService.currentAction = CodeSnippetEnum.DashboardViewMode;
      this.ddeApiService.setDashboardMode_View();
      this.toggleProperties = false;
      this.analyticsService.trackDashboardInteraction((<any>resources).actions.viewMode.eventName, (<any>resources).actions.viewMode.name, 'success', (<any>resources).actions.viewMode.message, null, (<any>resources).actionButton);
    }
    else {
      this.ddeActionService.currentAction = CodeSnippetEnum.DashboardEditMode;
      this.ddeApiService.setDashboardMode_Edit();
      this.analyticsService.trackDashboardInteraction((<any>resources).actions.editMode.eventName, (<any>resources).actions.editMode.name, 'success', (<any>resources).actions.editMode.message, null, (<any>resources).actionButton);
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
