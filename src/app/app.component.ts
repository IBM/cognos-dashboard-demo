import { Component, OnInit, isDevMode} from '@angular/core';
import { CodeSnippet } from '../model/code-snippet';
import { Session } from '../model/session';
import { Toaster } from '../model/toaster';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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
    if (!environment.production) {
      console.log('Development Mode');
    } else {
      console.log('Production Mode');
    }
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

    if (this.apiId !== '') {
      this.message = 'API created successfully.';
      this.toaster = new Toaster(this.message, 'alert-success', true);
    }
  }

  getCodeSnippet(event) {
    this.code_snippet = event;
  }
}
