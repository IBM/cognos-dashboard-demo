import { Component, OnInit } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

export const contentHeaders = new Headers();
contentHeaders.append('Accept', 'application/json');
contentHeaders.append('Content-Type', 'application/json');

@Component({
  selector: 'dde-session',
  templateUrl: './dde-session.component.html',
  styleUrls: ['./dde-session.component.css']
})
export class DdeSessionComponent implements OnInit {

  public client_id : string;
  public client_secret: string;
  public session_code: string;
  public session_info: string;

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

  createNewSession() {
    console.log("in create new session");
    let options = new RequestOptions({headers: contentHeaders});

    this.http.post('/api/dde/session', options).subscribe(
            data => {
              console.log("in dde-session createNewSession");
              console.log(JSON.stringify(data));
              this.session_code = data.json().sessionCode;
              this.session_info = JSON.stringify(data, undefined, 4);
            }
    );
  }
}
