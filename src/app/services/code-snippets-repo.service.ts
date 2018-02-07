import { Injectable } from '@angular/core';
import { CodeSnippetEnum, CodeSnippet } from '../../model/code-snippet';
import { environment } from '../../environments/environment';

@Injectable()
export class CodeSnippetsRepoService {

  private snippets;

  constructor() {
    this.snippets = new Map<string, CodeSnippet>();

    // Add snippets as key-value pairs
    this.snippets.set(CodeSnippetEnum.CreateSession, new CodeSnippet(CodeSnippetEnum.CreateSession, 'large'));
    this.snippets.set(CodeSnippetEnum.CreateAPIFramework, new CodeSnippet(CodeSnippetEnum.CreateAPIFramework, 'small'));
    this.snippets.set(CodeSnippetEnum.CreateDashboard, new CodeSnippet(CodeSnippetEnum.CreateDashboard, 'large'));
    this.snippets.set(CodeSnippetEnum.OpenDashboard, new CodeSnippet(CodeSnippetEnum.OpenDashboard, 'large'));
    this.snippets.set(CodeSnippetEnum.AddCSVSource, new CodeSnippet(CodeSnippetEnum.AddCSVSource, 'small'));
    this.snippets.set(CodeSnippetEnum.AddProtectedCSVSource, new CodeSnippet(CodeSnippetEnum.AddProtectedCSVSource, 'small'));
    this.snippets.set(CodeSnippetEnum.AddBikeShareWeatherCSVSource, new CodeSnippet(CodeSnippetEnum.AddBikeShareWeatherCSVSource, 'small'));
    this.snippets.set(CodeSnippetEnum.AddBikeShareRidesDemographCSVSource, new CodeSnippet(CodeSnippetEnum.AddBikeShareRidesDemographCSVSource, 'small'));
    //this.snippets.set(CodeSnippetEnum.AddDB2Source, new CodeSnippet(CodeSnippetEnum.AddDB2Source, this.addDB2SourceCodeSample, 'small'));
    //this.snippets.set(CodeSnippetEnum.AddProtectedDB2Source, new CodeSnippet(CodeSnippetEnum.AddProtectedDB2Source, this.addProtectedDB2SourceCodeSample, 'small'));
    this.snippets.set(CodeSnippetEnum.DashboardEditMode, new CodeSnippet(CodeSnippetEnum.DashboardEditMode, 'small'));
    this.snippets.set(CodeSnippetEnum.DashboardViewMode, new CodeSnippet(CodeSnippetEnum.DashboardViewMode, 'small'));
    this.snippets.set(CodeSnippetEnum.DashboardEditGroupMode, new CodeSnippet(CodeSnippetEnum.DashboardEditGroupMode, 'small'));
    this.snippets.set(CodeSnippetEnum.UndoLastAction, new CodeSnippet(CodeSnippetEnum.UndoLastAction, 'large'));
    this.snippets.set(CodeSnippetEnum.RedoLastAction, new CodeSnippet(CodeSnippetEnum.RedoLastAction, 'large'));
    this.snippets.set(CodeSnippetEnum.GetDashboardSpec, new CodeSnippet(CodeSnippetEnum.GetDashboardSpec, 'large'));
    this.snippets.set(CodeSnippetEnum.UpdateModuleDefinitions, new CodeSnippet(CodeSnippetEnum.UpdateModuleDefinitions, 'large'));
    this.snippets.set(CodeSnippetEnum.ClearDirtyState, new CodeSnippet(CodeSnippetEnum.ClearDirtyState, 'large'));
    this.snippets.set(CodeSnippetEnum.TogglePropertiesPane, new CodeSnippet(CodeSnippetEnum.TogglePropertiesPane, 'large'));
    this.snippets.set(CodeSnippetEnum.RegisterCallback, new CodeSnippet(CodeSnippetEnum.RegisterCallback, 'large'));
    this.snippets.set(CodeSnippetEnum.UnregisterCallback, new CodeSnippet(CodeSnippetEnum.UnregisterCallback, 'large'));
  }

  getSnippet(name) : CodeSnippet {
    return this.snippets.get(name);
  }
}
