import { Injectable } from '@angular/core';
import { CodeSnippetEnum, CodeSnippet } from '../../model/code-snippet';
import { environment } from '../../environments/environment';

@Injectable()
export class CodeSnippetsRepoService {

  private snippets;

  constructor() {
    this.snippets = new Map<string, CodeSnippet>();

    // Add snippets as key-value pairs
    this.snippets.set(CodeSnippetEnum.None, new CodeSnippet(CodeSnippetEnum.None, 'large', true));
    this.snippets.set(CodeSnippetEnum.CreateSession, new CodeSnippet(CodeSnippetEnum.CreateSession, 'large', false));
    this.snippets.set(CodeSnippetEnum.CreateAPIFramework, new CodeSnippet(CodeSnippetEnum.CreateAPIFramework, 'small', true));
    this.snippets.set(CodeSnippetEnum.CreateDashboard, new CodeSnippet(CodeSnippetEnum.CreateDashboard, 'large', true));
    this.snippets.set(CodeSnippetEnum.OpenDashboard, new CodeSnippet(CodeSnippetEnum.OpenDashboard, 'large', true));
    this.snippets.set(CodeSnippetEnum.AddCSVSource, new CodeSnippet(CodeSnippetEnum.AddCSVSource, 'small', true));
    this.snippets.set(CodeSnippetEnum.AddProtectedCSVSource, new CodeSnippet(CodeSnippetEnum.AddProtectedCSVSource, 'small', true));
    this.snippets.set(CodeSnippetEnum.AddBikeShareWeatherCSVSource, new CodeSnippet(CodeSnippetEnum.AddBikeShareWeatherCSVSource, 'small', true));
    this.snippets.set(CodeSnippetEnum.AddBikeShareRidesDemographCSVSource, new CodeSnippet(CodeSnippetEnum.AddBikeShareRidesDemographCSVSource, 'small', true));
    this.snippets.set(CodeSnippetEnum.DashboardEditMode, new CodeSnippet(CodeSnippetEnum.DashboardEditMode, 'small', true));
    this.snippets.set(CodeSnippetEnum.DashboardViewMode, new CodeSnippet(CodeSnippetEnum.DashboardViewMode, 'small', true));
    this.snippets.set(CodeSnippetEnum.DashboardEditGroupMode, new CodeSnippet(CodeSnippetEnum.DashboardEditGroupMode, 'small', true));
    this.snippets.set(CodeSnippetEnum.UndoLastAction, new CodeSnippet(CodeSnippetEnum.UndoLastAction, 'large', true));
    this.snippets.set(CodeSnippetEnum.RedoLastAction, new CodeSnippet(CodeSnippetEnum.RedoLastAction, 'large', true));
    this.snippets.set(CodeSnippetEnum.GetDashboardSpec, new CodeSnippet(CodeSnippetEnum.GetDashboardSpec, 'large', true));
    this.snippets.set(CodeSnippetEnum.UpdateModuleDefinitions, new CodeSnippet(CodeSnippetEnum.UpdateModuleDefinitions, 'large', true));
    this.snippets.set(CodeSnippetEnum.ClearDirtyState, new CodeSnippet(CodeSnippetEnum.ClearDirtyState, 'large', true));
    this.snippets.set(CodeSnippetEnum.TogglePropertiesPane, new CodeSnippet(CodeSnippetEnum.TogglePropertiesPane, 'large', true));
    this.snippets.set(CodeSnippetEnum.RegisterCallback, new CodeSnippet(CodeSnippetEnum.RegisterCallback, 'large', true));
    this.snippets.set(CodeSnippetEnum.UnregisterCallback, new CodeSnippet(CodeSnippetEnum.UnregisterCallback, 'large', true));
    this.snippets.set(CodeSnippetEnum.RegisterApiCallback, new CodeSnippet(CodeSnippetEnum.RegisterApiCallback, 'large', true));
    this.snippets.set(CodeSnippetEnum.UnregisterApiCallback, new CodeSnippet(CodeSnippetEnum.UnregisterApiCallback, 'large', true));
    this.snippets.set(CodeSnippetEnum.CloseApiFramework, new CodeSnippet(CodeSnippetEnum.CloseApiFramework, 'large', true));
  }

  getSnippet(name) : CodeSnippet {
    return this.snippets.get(name);
  }

  setSnippet(name: string, codeSnippet: CodeSnippet) {
    if (this.snippets.has(name)) {
      this.snippets.set(name, codeSnippet);
    }
  }

  disableRunButton() {
    this.snippets.forEach(function(codeSnippet, key, snippets) {
      if (key !== CodeSnippetEnum.CreateSession) {
        codeSnippet.disableRun = true;
        snippets.set(key, codeSnippet);
      }
    });
  }
}
