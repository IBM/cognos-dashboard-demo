import { CodeSnippetEnum } from './code-snippet';

export class DashboardMode {
  constructor(public type, public value: string) {
  }
}

export const EditMode = new DashboardMode('Edit', CodeSnippetEnum.DashboardEditMode);
export const ViewMode = new DashboardMode('View', CodeSnippetEnum.DashboardViewMode);
export const EditGroupMode = new DashboardMode('EditGroup', CodeSnippetEnum.DashboardEditGroupMode);
