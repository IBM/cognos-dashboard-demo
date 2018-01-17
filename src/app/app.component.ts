import { Component, OnInit, isDevMode} from '@angular/core';
import { CodeSnippet } from '../model/code-snippet';
import { Session } from '../model/session';
import { Toaster } from '../model/toaster';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

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
  private timer: Observable<any>;

  constructor() {
  }

  ngOnInit() {
    if (!environment.production) {
      console.log('Development Mode');
    } else {
      console.log('Production Mode');
    }

    this.timer = Observable.timer(environment.toaster_timer);
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  sessionInfo(event) {
    this.session = event;

    if (this.session !== null) {
      this.message = 'Session created successfully. <a href=www.google.com>Create and initialize the API framework</a>';
      this.setToaster(this.message, 'success', true);
    }
  }

  getAPIId(event) {
    this.apiId = event;

    if (this.apiId !== '') {
      this.message = 'API created successfully. You can now <a>create</a> or <a>open</a> a dashboard.';
      this.setToaster(this.message, 'success', true);
    }
  }

  getCodeSnippet(event) {
    this.code_snippet = event;
  }

   setToaster(message: string, cssclass: string, showToaster: boolean) {
    this.toaster = new Toaster(message, cssclass, showToaster);

    this.timer.subscribe(() => {
          this.toaster.showToaster = false;
      });
    }
  }
