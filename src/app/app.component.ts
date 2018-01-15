import { Component } from '@angular/core';
import { DdeApiService } from './dde-api.service';
import { CodeSnippet } from '../model/code-snippet';
import { Session } from '../model/session';

interface Window {
    dashboardAPI: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  private apiId: string = '';
  public parent_update_module_def_info: string;
  private code_snippet: CodeSnippet;
  private session : Session = null;
  private collapsed: boolean = true;
  private isFirstOpen: boolean = true;

  constructor(private ddeApiService:DdeApiService) {
  }

  ngOnInit() {

    }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  sessionInfo(event) {
    this.session = event;
  }

  getAPIId(event) {
    this.apiId = event;
  }

  getCodeSnippet(event) {
    this.code_snippet = event;
  }
}
