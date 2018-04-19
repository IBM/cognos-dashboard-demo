import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { CodeSnippet, CodeSnippetEnum } from '../../model/code-snippet'
import { CodeSnippetsRepoService } from '../services/code-snippets-repo.service';
import { DdeApiService } from '../services/dde-api.service';
import * as menu_resource from '../../assets/resources/menu.json';

export const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');

@Component({
  selector: 'dde-menu',
  templateUrl: './dde-menu.component.html',
  styleUrls: ['./dde-menu.component.css']
})
export class DdeMenuComponent implements OnInit {
  @Output()
  moduleDefinitionUpdated: EventEmitter<String> = new EventEmitter<String>();
  @Output()
  codeToRun = new EventEmitter<CodeSnippet>();
  nextStep: CodeSnippetEnum;
  currentSelection: CodeSnippetEnum;
  menu_resx = menu_resource;
  enumType = CodeSnippetEnum;

  public client_id : string;
  public client_secret: string;
  public updated_db_spec : string;
  public code_samples: string;
  private collapsed: boolean = true;
  private isFirstOpen: boolean = true;

  constructor(private http: Http, private ddeApiService: DdeApiService,
              private codeSnippetsRepoService: CodeSnippetsRepoService) {
  }

  ngOnInit() {
    this.nextStep = CodeSnippetEnum.CreateSession;
    this.getCodeSnippet(CodeSnippetEnum.None);
  }

  nextStepToProcess() {
    return this.nextStep;
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  getCodeSnippet(codeSnippetEnum) {
    this.currentSelection = codeSnippetEnum;
    this.codeToRun.emit(this.codeSnippetsRepoService.getSnippet(this.currentSelection));
  }
}
