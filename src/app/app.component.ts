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
  loadCognosApi: Promise<any>;

   constructor(private analyticsService: AnalyticsService) {
       this.cognos_url = environment.cognos_api_js;
  }

  ngOnInit() {
    this.analyticsService.setupSegment(environment.segment_key);
    this.loadScripts(environment.bluemixLib);

    this.loadCognosApi = new Promise((resolve) => {
       this.loadScripts(this.cognos_url);
         console.log('cognos script loaded');
   });
  }

  loadScripts(source: string) {
    let node = document.createElement('script');
    node.src =  source;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

}
