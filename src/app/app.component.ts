import { Component, OnInit } from '@angular/core';
import { CodeSnippetEnum, CodeSnippet } from '../model/code-snippet';
import { Session } from '../model/session';
import { Toaster } from '../model/toaster';
import { CodeSnippetsRepoService } from './services/code-snippets-repo.service';
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
  private dashboardApi: string = '';
  public parent_update_module_def_info: string;
  private code_snippet: CodeSnippet;
  private session : Session = null;
  private toaster: Toaster;
  private message : string;
  private timer: Observable<any>;
  private showPanel: boolean = true;
  private nextStep: CodeSnippetEnum = CodeSnippetEnum.CreateSession;

  constructor(private codeSnippetsRepoService: CodeSnippetsRepoService) {
  }

  ngOnInit() {
    if (!environment.production) {
      console.log('Development Mode');
    } else {
      console.log('Production Mode');
    }

    this.timer = Observable.timer(environment.toaster_timer);
  }

  sessionInfo(event) {
    this.session = event;

    if (this.session !== null) {
      this.message = 'Session created successfully. Create and initialize the API framework.';
      this.setToaster(this.message, 'success', true);
      this.nextStep = CodeSnippetEnum.CreateAPIFramework;
    }
    else {
      this.message = 'An error has occured. Please check the console log for more details.';
      this.setToaster(this.message, 'failure', true);
    }
  }

  getAPIId(event) {
    this.apiId = event;

    if (this.apiId !== '') {
      this.message = 'API created successfully. You can now create or open a dashboard.';
      this.setToaster(this.message, 'success', true);
      this.nextStep = CodeSnippetEnum.CreateDashboard;
    }
    else {
      this.message = 'An error has occured. Please check the console log for more details.';
      this.setToaster(this.message, 'failure', true);
    }
  }

  getDashboardApi(event) {
    this.dashboardApi = event;

    if (this.dashboardApi !== '') {
      this.nextStep = CodeSnippetEnum.None;
    }
    else {
      this.message = 'An error has occured. Please check the console log for more details.';
      this.setToaster(this.message, 'failure', true);
    }
  }

  // set the code snippt to what was fired over
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
