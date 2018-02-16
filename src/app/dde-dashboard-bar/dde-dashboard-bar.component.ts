import { Component, OnInit, Input } from '@angular/core';
import { DdeApiService } from '../services/dde-api.service';
import { DdeActionService } from '../services/dde-action.service';
import { CodeSnippetEnum } from '../../model/code-snippet';

@Component({
  selector: 'dde-dashboard-bar',
  templateUrl: './dde-dashboard-bar.component.html',
  styleUrls: ['./dde-dashboard-bar.component.css']
})
export class DdeDashboardBarComponent implements OnInit {
  @Input() disableButtons : boolean;
  private isEditMode : boolean = true;
  private toggleProperties : boolean = false;
  constructor(private ddeApiService: DdeApiService, private ddeActionService: DdeActionService) { }

  ngOnInit() {
    this.ddeActionService.hasActionChanged.subscribe(() => {
      this.shouldReset();
      this.toggleDashboardMode();
      this.togglePropertiesMode();
    })
  }

  onTogglePropertiesPaneDisableButtons() {
    let classes =  {
        disabled: this.disableButtons || !this.isEditMode,
        enabled: !this.disableButtons && this.isEditMode
    };
    return classes;
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
  }

  redoLastAction() {
    this.ddeApiService.redoLastAction();
    this.ddeActionService.previousAction = this.ddeActionService.currentAction;
    this.ddeActionService.currentAction = CodeSnippetEnum.UndoLastAction;
    this.toggleDashboardMode();
  }

  togglePropertiesPane() {
    this.ddeActionService.previousAction = this.ddeActionService.currentAction;
    this.ddeActionService.currentAction = CodeSnippetEnum.TogglePropertiesPane;
    this.ddeApiService.togglePropertiesPane();
    this.togglePropertiesMode();
  }

  editDashboard() {
    this.ddeActionService.previousAction = this.ddeActionService.currentAction;
    this.ddeActionService.isAddingDataSourceLastUpdateToDashboard = false;

    if (this.isEditMode) {
      this.ddeActionService.currentAction = CodeSnippetEnum.DashboardViewMode;
      this.ddeApiService.setDashboardMode_View();
      this.toggleProperties = false;
    }
    else {
      this.ddeActionService.currentAction = CodeSnippetEnum.DashboardEditMode;
      this.ddeApiService.setDashboardMode_Edit();
    }

    this.toggleDashboardMode();
  }

  toggleDashboardMode() {
    if (this.ddeActionService.shouldToggleEditButton()) {
      this.isEditMode = !this.isEditMode;
    }
  }

  togglePropertiesMode()  {
    if (this.ddeActionService.shouldTogglePropertiesPane()) {
      this.toggleProperties = !this.toggleProperties;
    }
  }

  shouldReset() {
    if (this.ddeActionService.currentAction === CodeSnippetEnum.CreateDashboard ||
        this.ddeActionService.currentAction === CodeSnippetEnum.OpenDashboard) {
          this.isEditMode = true;
          this.toggleProperties = false;
        }
  }
}
