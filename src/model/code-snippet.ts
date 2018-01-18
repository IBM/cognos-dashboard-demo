export enum CodeSnippetEnum {
  CreateSession = 'CreateSession',
  CreateAPIFramework = 'CreateAPIFramework',
  CreateDashboard = 'CreateDashboard',
  OpenDashboard = 'OpenDashboard',
  AddCSVSource = 'AddCSVSource',
  AddDB2Source = 'AddDB2Source',
  AddProtectedDB2Source = 'AddProtectedDB2Source',
  AddProtectedCSVSource = 'AddProtectedCSVSource',
  DashboardEditMode = 'DashboardEditMode',
  DashboardViewMode = 'DashboardViewMode',
  DashboardEditGroupMode = 'DashboardEditGroupMode'
}

export class CodeSnippet {
   constructor(public selection: CodeSnippetEnum, public code: string, public size: string) {
   }
}
