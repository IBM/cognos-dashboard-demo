import { Component, OnInit } from '@angular/core';
import { DdeApiService } from '../services/dde-api.service';
import { AnalyticsService } from '../../instrumentation/analytics';
import * as resources from '../../assets/resources/resources.json';

@Component({
  selector: 'dde-dashboard',
  templateUrl: './dde-dashboard.component.html',
  styleUrls: ['./dde-dashboard.component.css']
})
export class DdeDashboardComponent implements OnInit {

  public disableDashboardBarButtons: boolean = true;
  constructor(private ddeApiService: DdeApiService, private analyticsService: AnalyticsService) { }

  ngOnInit() {
    this.loadDasboard();
    this.analyticsService.loadPage((<any>resources).categoryValue, (<any>resources).endUserPageName);
  //  window.bluemixAnalytics.pageEvent((<any>resources).categoryValue, name = (<any>resources).endUserPageName);
  }

  async loadDasboard() {
    try {
        await this.ddeApiService.createNewSession();
        await this.ddeApiService.createAndInitApiFramework();
        await this.ddeApiService.openDashboard();
        this.disableDashboardBarButtons = false;
    }
    catch(e) {
      console.log(e);
    }
  }

}
