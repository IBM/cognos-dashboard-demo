export enum CodeSnippetEnum {
  None = 'None',
  CreateSession = 'CreateSession',
  CreateAPIFramework = 'CreateAPIFramework',
  CreateDashboard = 'CreateDashboard',
  OpenDashboard = 'OpenDashboard',
  AddCSVSource = 'AddCSVSource',
  AddProtectedCSVSource = 'AddProtectedCSVSource',
  AddBikeShareWeatherCSVSource = 'AddBikeShareWeatherCSVSource',
  AddBikeShareRidesDemographCSVSource = 'AddBikeShareRidesDemographCSVSource',
  //AddDB2Source = 'AddDB2Source',
  //AddProtectedDB2Source = 'AddProtectedDB2Source',
  DashboardEditMode = 'DashboardEditMode',
  DashboardViewMode = 'DashboardViewMode',
  DashboardEditGroupMode = 'DashboardEditGroupMode',
  UndoLastAction = 'UndoLastAction',
  RedoLastAction = 'RedoLastAction',
  TogglePropertiesPane = 'TogglePropertiesPane',
  GetDashboardSpec = 'GetDashboardSpec',
  UpdateModuleDefinitions = 'UpdateModuleDefinitions',
  ClearDirtyState = 'ClearDirtyState',
  RegisterCallback = 'RegisterCallback',
  UnregisterCallback = 'UnregisterCallback',
  RegisterApiCallback = 'RegisterApiCallback',
  UnregisterApiCallback = 'UnregisterApiCallback',
  CloseApiFramework = 'CloseApiFramework'
}

export class CodeSnippet {
   constructor(public selection: CodeSnippetEnum, public size: string, public disableRun: boolean) {
   }
}
