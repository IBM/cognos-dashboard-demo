import { Injectable } from '@angular/core';
import { CodeSnippetEnum, CodeSnippet } from '../../model/code-snippet';
import { environment } from '../../environments/environment';

@Injectable()
export class CodeSnippetsRepoService {

  private snippets;

  constructor() {
    this.snippets = new Map<string, CodeSnippet>();

    // Add snippets as key-value pairs
    this.snippets.set(CodeSnippetEnum.CreateSession, new CodeSnippet(CodeSnippetEnum.CreateSession, '', 'large'));
    this.snippets.set(CodeSnippetEnum.CreateAPIFramework, new CodeSnippet(CodeSnippetEnum.CreateAPIFramework, this.createAndInitApiFrameworkCodeSample, 'small'));
    this.snippets.set(CodeSnippetEnum.CreateDashboard, new CodeSnippet(CodeSnippetEnum.CreateDashboard, this.createDashboardCodeSample, 'large'));
    this.snippets.set(CodeSnippetEnum.OpenDashboard, new CodeSnippet(CodeSnippetEnum.OpenDashboard, this.openDashboardCodeSample, 'large'));
    this.snippets.set(CodeSnippetEnum.AddCSVSource, new CodeSnippet(CodeSnippetEnum.AddCSVSource, this.addCSVSourceCodeSample, 'small'));
    this.snippets.set(CodeSnippetEnum.AddProtectedCSVSource, new CodeSnippet(CodeSnippetEnum.AddProtectedCSVSource, this.addProtectedCSVSourceCodeSample, 'small'));
    this.snippets.set(CodeSnippetEnum.AddBikeShareWeatherCSVSource, new CodeSnippet(CodeSnippetEnum.AddBikeShareWeatherCSVSource, this.addBikeShareWeatherCSVSourceCodeSample, 'small'));
    this.snippets.set(CodeSnippetEnum.AddBikeShareRidesDemographCSVSource, new CodeSnippet(CodeSnippetEnum.AddBikeShareRidesDemographCSVSource, this.addBikeShareRidesDemographCSVSourceCodeSample, 'small'));
    //this.snippets.set(CodeSnippetEnum.AddDB2Source, new CodeSnippet(CodeSnippetEnum.AddDB2Source, this.addDB2SourceCodeSample, 'small'));
    //this.snippets.set(CodeSnippetEnum.AddProtectedDB2Source, new CodeSnippet(CodeSnippetEnum.AddProtectedDB2Source, this.addProtectedDB2SourceCodeSample, 'small'));
    this.snippets.set(CodeSnippetEnum.DashboardEditMode, new CodeSnippet(CodeSnippetEnum.DashboardEditMode, this.setDashboardModeEditCodeSample, 'small'));
    this.snippets.set(CodeSnippetEnum.DashboardViewMode, new CodeSnippet(CodeSnippetEnum.DashboardViewMode, this.setDashboardModeViewCodeSample, 'small'));
    this.snippets.set(CodeSnippetEnum.DashboardEditGroupMode, new CodeSnippet(CodeSnippetEnum.DashboardEditGroupMode, this.setDashboardModeEditGroupCodeSample, 'small'));
    this.snippets.set(CodeSnippetEnum.UndoLastAction, new CodeSnippet(CodeSnippetEnum.UndoLastAction, this.undoLastActionCodeSample, 'large'));
    this.snippets.set(CodeSnippetEnum.RedoLastAction, new CodeSnippet(CodeSnippetEnum.RedoLastAction, this.redoLastActionCodeSample, 'large'));
    this.snippets.set(CodeSnippetEnum.GetDashboardSpec, new CodeSnippet(CodeSnippetEnum.GetDashboardSpec, this.getDashboardSpecCodeSample, 'large'));
    this.snippets.set(CodeSnippetEnum.ClearDirtyState, new CodeSnippet(CodeSnippetEnum.ClearDirtyState, this.clearDirtyStateCodeSample, 'large'));
  }

  getSnippet(name) : CodeSnippet {
    return this.snippets.get(name);
  }
}
