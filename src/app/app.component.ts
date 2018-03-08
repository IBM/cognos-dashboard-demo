import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent implements OnInit {
  cognos_url: string;
  loadCognosApi: Promise<any>;

   constructor() {
       this.cognos_url = environment.cognos_api_js;
  }

  ngOnInit() {

    this.loadCognosApi = new Promise((resolve) => {
       this.loadCognosApiScript();
         console.log('cognos script loaded');
   });
  }

  loadCognosApiScript() {
    let node = document.createElement('script');
    node.src =  this.cognos_url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

}
