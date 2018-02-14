import { Component, OnInit } from '@angular/core';
import { DdeApiService } from '../services/dde-api.service';

@Component({
  selector: 'dde-dashboard',
  templateUrl: './dde-dashboard.component.html',
  styleUrls: ['./dde-dashboard.component.css']
})
export class DdeDashboardComponent implements OnInit {

  constructor(private ddeApiService: DdeApiService) { }

  ngOnInit() {
    this.loadDasboard();
  }

  async loadDasboard() {
    try {
        await this.ddeApiService.createNewSession();
        await this.ddeApiService.createAndInitApiFramework();
        await this.ddeApiService.createDashboard();
    }
    catch(e) {
      console.log(e);
    }
  }

}
