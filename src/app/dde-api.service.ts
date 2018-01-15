import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class DdeApiService {

  constructor() { }

  private ddeMyVar: string;
  private dashboardAPI;


  myVar = this.ddeMyVar;

  setDashboardApi(dashboardAPI) {
    this.dashboardAPI = dashboardAPI;
    console.log(this.dashboardAPI);
  }


  addDb2SampleSource(db2_sample_module) {
    console.log("in dde-api.service");
    console.log(this.dashboardAPI);

    this.dashboardAPI.addSources([{
      module: db2_sample_module,
      name: 'Test Source',
      id: 'myUniqueId123'
    }]);
  }

  addCSVSampleSource(csv_sample_module) {
    console.log("in dde-api.service");
    console.log(this.dashboardAPI);

    this.dashboardAPI.addSources([{
      module: csv_sample_module,
      name: 'Test CSV Source',
      id: 'myUniqueId789'
    }]);

  }

}
