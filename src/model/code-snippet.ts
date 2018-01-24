export enum CodeSnippetEnum {
  CreateSession = 'CreateSession',
  CreateAPIFramework = 'CreateAPIFramework',
  CreateDashboard = 'CreateDashboard',
  OpenDashboard = 'OpenDashboard',
  AddCSVSource = 'AddCSVSource',
  AddProtectedCSVSource = 'AddProtectedCSVSource',
  AddCSVSource2 = 'AddCSVSource2',
  AddBikeShareWeatherCSVSource = 'AddBikeShareWeatherCSVSource',
  //AddDB2Source = 'AddDB2Source',
  //AddProtectedDB2Source = 'AddProtectedDB2Source',
  DashboardEditMode = 'DashboardEditMode',
  DashboardViewMode = 'DashboardViewMode',
  DashboardEditGroupMode = 'DashboardEditGroupMode',
  UndoLastAction = 'UndoLastAction',
  RedoLastAction = 'RedoLastAction'
}

export class CodeSnippet {
   constructor(public selection: CodeSnippetEnum, public code: string, public size: string) {
   }
}
