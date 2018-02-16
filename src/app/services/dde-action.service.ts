import { Injectable } from '@angular/core';
import { CodeSnippetEnum } from '../../model/code-snippet';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DdeActionService {
  public previousAction: string;
  public currentAction: string;
  public hasActionChanged = new BehaviorSubject(false);
  public isAddingDataSourceLastUpdateToDashboard: boolean = false;
  constructor() {

  }

  shouldToggleEditButton() {
    return (!this.isAddingDataSourceLastUpdateToDashboard &&
            ((this.currentAction === CodeSnippetEnum.TogglePropertiesPane &&
            this.previousAction === CodeSnippetEnum.UndoLastAction) ||
            (this.currentAction === CodeSnippetEnum.TogglePropertiesPane &&
            this.previousAction === CodeSnippetEnum.RedoLastAction) ||
            (this.currentAction === CodeSnippetEnum.DashboardEditMode ||
            this.currentAction === CodeSnippetEnum.DashboardViewMode ||
            this.currentAction === CodeSnippetEnum.UndoLastAction ||
            this.currentAction === CodeSnippetEnum.RedoLastAction)));
  }

  shouldTogglePropertiesPane() {
    return this.currentAction === CodeSnippetEnum.TogglePropertiesPane;
  }

}
