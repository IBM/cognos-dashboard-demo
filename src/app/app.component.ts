import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { AnalyticsService } from '../instrumentation/analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent implements OnInit {
  cognos_url: string;
  bluemix_analytics_url: string;
  loadCognosApi: Promise<any>;

   constructor(private analyticsService: AnalyticsService) {
       this.cognos_url = environment.cognos_api_js;
       this.bluemix_analytics_url = environment.bluemix_analytics_js;
  }

  ngOnInit() {
  //  this.analyticsService.setupSegment(environment.segment_key);
    //this.loadBluemixAnalyticsScript();

    this.loadCognosApi = new Promise((resolve) => {
      this.loadCognosApiScript();
      console.log('cognos script loaded');
   });
  }

  loadCognosApiScript() {
    this.loadScript(this.cognos_url);
  }

  loadBluemixAnalyticsScript() {
    this.loadScript(this.bluemix_analytics_url);
  }

  loadScript(srcUrl) {
    let node = document.createElement('script');
    node.src =  srcUrl;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

}
