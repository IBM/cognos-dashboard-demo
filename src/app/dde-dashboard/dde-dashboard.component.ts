import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { CodeSnippet, CodeSnippetEnum } from '../../model/code-snippet'
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
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(CodeSnippetEnum.AddCSVSource));
  }

  setDashboardEditMode() {
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(CodeSnippetEnum.DashboardEditMode));
  }

  setDashboardViewMode() {
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(CodeSnippetEnum.DashboardViewMode));
  }

  setDashboardEditGroupMode() {
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(CodeSnippetEnum.DashboardEditGroupMode));
  }

  undoLastAction() {
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(CodeSnippetEnum.UndoLastAction));
  }

  redoLastAction() {
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(CodeSnippetEnum.RedoLastAction));
  }
}
