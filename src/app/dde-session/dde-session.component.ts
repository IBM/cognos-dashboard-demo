import { Component, OnInit } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

@Component({
  selector: 'dde-session',
  templateUrl: './dde-session.component.html',
  styleUrls: ['./dde-session.component.css']
})
export class DdeSessionComponent implements OnInit {

  public client_id : string;
  public client_secret: string;

  constructor(private http: Http ) { }

  ngOnInit() {
    // this.getDDECred();
  }

  getDDECred() {
    console.log("in get dde creds");

    this.http.get('/api/dde/credentials').subscribe(
            data => {
              console.log("in dde-session getcred");
              this.client_id = data.json().client_id;
              this.client_secret = "****";
              console.log(data.json());
            }
    );

  }
}
