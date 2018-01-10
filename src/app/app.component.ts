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

  public parent_session_info: string;
  public parent_api_framework_info: string;
  public parent_update_module_def_info: string;
  public parent_codeToDisplay: string;

  constructor(private ddeApiService:DdeApiService) {

  }

  ngOnInit() {

    }

  parentSessionInfoCreated(event) {
    //this.parent_session_info = event;
    this.parent_codeToDisplay = event;
  }

  parentApiFrameworkCreated(event) {
      this.parent_api_framework_info = event;
  }

  parentModuleDefUpdated(event) {
      this.parent_update_module_def_info = event;
  }

}
