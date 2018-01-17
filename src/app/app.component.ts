import { Component } from '@angular/core';
import { CodeSnippetEnum, CodeSnippet } from '../model/code-snippet';
import { Session } from '../model/session';
import { Toaster } from '../model/toaster';
import { CodeSnippetsRepoService } from './services/code-snippets-repo.service';

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

  constructor(private codeSnippetsRepoService: CodeSnippetsRepoService) {
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

  // set the code snippt to what was fired over
  getCodeSnippet(event) {
    this.code_snippet = event;
  }

  displayCreateDashboardCode() {
    this.code_snippet = this.codeSnippetsRepoService.getSnippet(CodeSnippetEnum.CreateDashboard);

    /*  let self = this;
      this.api.dashboard.createNew().then(
          function(dashboardAPI) {
              console.log('Dashboard created successfully.');
            //  self.ddeApiService.dashboardAPI = dashboardAPI;
             self.ddeApiService.setDashboardApi(dashboardAPI);
            console.log(self.api.dashboard);
          }
      ).catch(
          function(err) {
              console.log('User hit cancel on the template picker page.');
          }
      );*/
  }

  displayOpenDashboardCode() {
    this.code_snippet = this.codeSnippetsRepoService.getSnippet(CodeSnippetEnum.OpenDashboard);
  }
}
