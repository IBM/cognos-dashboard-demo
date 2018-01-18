import { Injectable } from '@angular/core';
import { CodeSnippetEnum, CodeSnippet } from '../../model/code-snippet';


@Injectable()
export class CodeSnippetsRepoService {

  private snippets;

  constructor() {
    this.snippets = new Map<string, CodeSnippet>();

    // Add snippets as key-value pairs
    this.snippets.set(CodeSnippetEnum.CreateDashboard, new CodeSnippet(3, this.createDashboardCodeSample, 'large'));
    this.snippets.set(CodeSnippetEnum.OpenDashboard, new CodeSnippet(99, this.openDashboardCodeSample, 'large'));
    this.snippets.set(CodeSnippetEnum.UndoLastAction, new CodeSnippet(99, this.undoLastActionCodeSample, 'large'));
    this.snippets.set(CodeSnippetEnum.RedoLastAction, new CodeSnippet(99, this.redoLastActionCodeSample, 'large'));
    // TODO: add other snippets here
  }

  getSnippet(name) : CodeSnippet {
    return this.snippets.get(name);
  }

  private createDashboardCodeSample = 'hey this.dashboardAPI = await this.api.dashboard.createNew();';
  private openDashboardCodeSample = 'hi there, this is the open dashboard code;';
  private undoLastActionCodeSample = 'TODO: undo code sample';
  private redoLastActionCodeSample = 'TODO: redo code sample';
}
