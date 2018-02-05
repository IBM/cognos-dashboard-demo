import { Component, OnInit, ViewChild } from '@angular/core';
import { CodeSnippetEnum, CodeSnippet } from '../model/code-snippet';
import { Session } from '../model/session';
import { Toaster } from '../model/toaster';
import { CodeSnippetsRepoService } from './services/code-snippets-repo.service';
import { DdeToasterComponent } from './dde-toaster/dde-toaster.component';
import { DdeDashboardComponent } from './dde-dashboard/dde-dashboard.component';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(DdeToasterComponent) private toasterComp: DdeToasterComponent;
  @ViewChild(DdeDashboardComponent) private dashBoardComp: DdeDashboardComponent;

  title = 'app';

  private apiId: string = '';
  private dashboardApi: any = null;
  public parent_update_module_def_info: string;
  private code_snippet: CodeSnippet;
  private session : Session = null;
  private toaster: Toaster;
  private message : string;
  private showPanel: boolean;
  private colSize: string = 'col-md-6';

  constructor(private codeSnippetsRepoService: CodeSnippetsRepoService) {
  }

  ngOnInit() {
    if (!environment.production) {
      console.log('Development Mode');
    } else {
      console.log('Production Mode');
    }
  }

  showPanels(event) {
    this.showPanel = event;
    this.colSize = event ? 'col-md-6' : 'col-md-12';
  }

  sessionInfo(event) {
    this.session = event;

    if (this.session !== null) {
      this.message = 'Session created successfully. Next, create and initialize the API framework.';
      this.setToaster(this.message, 'success', true);
      this.dashBoardComp.nextStep = CodeSnippetEnum.CreateAPIFramework;
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
      this.dashBoardComp.nextStep = CodeSnippetEnum.CreateDashboard;
    }
    else {
      this.message = 'An error has occured. Please check the console log for more details.';
      this.setToaster(this.message, 'failure', true);
    }
  }

  getDashboardApi(event) {
    this.dashboardApi = event;

    if (this.dashboardApi !== '') {
      this.dashBoardComp.nextStep = CodeSnippetEnum.AddCSVSource;
      this.dashboardApi.on("addSource:clicked", () => {
        this.dashBoardComp.currentSelection = CodeSnippetEnum.AddCSVSource;
        this.code_snippet = this.codeSnippetsRepoService.getSnippet(CodeSnippetEnum.AddCSVSource);
      });
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
    this.toasterComp.showToaster(this.toaster);
  }


}
