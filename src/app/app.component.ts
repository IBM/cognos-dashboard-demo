import { Component } from '@angular/core';
import { DdeApiService } from './dde-api.service';

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

  private session_code: string;
  private session_id: string;
  public parent_api_framework_info: string;
  public parent_update_module_def_info: string;
  public codeToDisplay: string;
  public tabSelection: number;

  constructor(private ddeApiService:DdeApiService) {

  }

  ngOnInit() {

    }

  sessionInfo(event) {
    this.session_code = event.code;
    this.session_id = event.id;
  }

  parentSessionInfoCreated(event) {
    //this.parent_session_info = event;
    this.codeToDisplay = event.code;
    this.tabSelection = event.selection;
  }

  parentApiFrameworkCreated(event) {
      this.parent_api_framework_info = event;
  }

  parentModuleDefUpdated(event) {
      this.parent_update_module_def_info = event;
  }

}
