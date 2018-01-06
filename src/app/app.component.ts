import { Component } from '@angular/core';

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

  parentSessionInfoCreated(event) {
    this.parent_session_info = event;
  }

  parentApiFrameworkCreated(event) {
      this.parent_api_framework_info = event;
  }

  parentModuleDefUpdated(event) {
      this.parent_update_module_def_info = event;
  }

}
