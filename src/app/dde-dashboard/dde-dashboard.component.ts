import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { DdeApiService } from '../services/dde-api.service';
import { AnalyticsService } from '../../instrumentation/analytics';
import * as instrumentation from '../../assets/resources/instrumentation.json';
import { Toaster } from '../../model/toaster';
import { DdeToasterComponent } from '../dde-toaster/dde-toaster.component';

@Component({
  selector: 'dde-dashboard',
  templateUrl: './dde-dashboard.component.html',
  styleUrls: ['./dde-dashboard.component.css']
})
export class DdeDashboardComponent implements AfterViewInit {

  public disableDashboardBarButtons: boolean = true;
  @ViewChild(DdeToasterComponent) private toasterComp: DdeToasterComponent;

  constructor(private ddeApiService: DdeApiService, private analyticsService: AnalyticsService) { }

  ngAfterViewInit() {
    this.loadDasboard();
    this.analyticsService.loadPage((<any>instrumentation).categoryValue, (<any>instrumentation).endUserPageName);
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
      this.toasterComp.showToaster(new Toaster((<any>instrumentation).errorMessage, 'error', true));
    }
  }

}
