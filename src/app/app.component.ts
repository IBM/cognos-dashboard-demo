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

  constructor(private ddeApiService:DdeApiService) {

  }

  ngOnInit() {

    }

  sessionInfo(event) {
    this.session = event;
  }

  getCodeSnippet(event) {
    this.code_snippet = event;
  }

  parentApiFrameworkCreated(event) {
    this.apiId = event;
  }

  parentModuleDefUpdated(event) {
      this.parent_update_module_def_info = event;
  }

}
