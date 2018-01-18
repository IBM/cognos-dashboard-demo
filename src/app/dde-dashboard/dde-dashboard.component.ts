import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { CodeSnippetEnum, CodeSnippet, CSVSourceCS, SetDashboardModeEditCS, SetDashboardModeViewCS, SetDashboardModeEditGroupCS } from '../../model/code-snippet'
import { CodeSnippetsRepoService } from '../services/code-snippets-repo.service';

@Component({
  selector: 'dde-dashboard',
  templateUrl: './dde-dashboard.component.html',
  styleUrls: ['./dde-dashboard.component.css'],
})
export class DdeDashboardComponent implements OnInit {
  @Output() codeToRun = new EventEmitter<CodeSnippet>();

  constructor(private codeSnippetsRepoService: CodeSnippetsRepoService) {
  }

  ngOnInit() {
  }

  addSourcesToDashboard() {
    this.codeToRun.emit(CSVSourceCS);
  }

  setDashboardEditMode() {
    this.codeToRun.emit(SetDashboardModeEditCS);
  }

  setDashboardViewMode() {
    this.codeToRun.emit(SetDashboardModeViewCS);
  }

  setDashboardEditGroupMode() {
    this.codeToRun.emit(SetDashboardModeEditGroupCS);
  }

  setDashboardMode() {
    this.codeToRun.emit(SetDashboardModeEditCS);
  }

  undoLastAction() {
    // TODO: add CodeSnippetEnum.UndoLastAction
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(CodeSnippetEnum.CreateDashboard));
  }

  redoLastAction() {
    // TODO: add CodeSnippetEnum.RedoLastAction
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(CodeSnippetEnum.CreateDashboard));
  }
}
