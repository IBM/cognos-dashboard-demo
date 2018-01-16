import { Component } from '@angular/core';
import { CodeSnippet } from '../model/code-snippet';
import { Session } from '../model/session';
import { Toaster } from '../model/toaster';

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
  private toaster: Toaster;
  private message : string;


  constructor() {
  }

  ngOnInit() {

    }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  sessionInfo(event) {
    this.session = event;

    if (this.session !== null) {
      this.message = 'Session created successfully. <a href=www.google.com>Create and initialize the API framework</a>';
      this.toaster = new Toaster(this.message, 'alert-success', true);
    }
  }

  getAPIId(event) {
    this.apiId = event;
  }

  getCodeSnippet(event) {
    this.code_snippet = event;
  }


}
