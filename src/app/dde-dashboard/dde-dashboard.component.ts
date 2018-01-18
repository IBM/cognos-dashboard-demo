import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { CodeSnippet, CSVSourceCS, SetDashboardModeEditCS, SetDashboardModeViewCS, SetDashboardModeEditGroupCS } from '../../model/code-snippet'

@Component({
  selector: 'dde-dashboard',
  templateUrl: './dde-dashboard.component.html',
  styleUrls: ['./dde-dashboard.component.css'],
})
export class DdeDashboardComponent implements OnInit {
  @Output() codeToRun = new EventEmitter<CodeSnippet>();

  constructor() {
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
    this.code_snippet = this.codeSnippetsRepoService.getSnippet(CodeSnippetEnum.UndoLastAction);
  }

  redoLastAction() {
    this.code_snippet = this.codeSnippetsRepoService.getSnippet(CodeSnippetEnum.RedoLastAction);
  }

}
