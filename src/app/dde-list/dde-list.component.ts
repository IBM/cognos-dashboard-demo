import { Component, OnInit } from '@angular/core';
//import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

@Component({
  selector: 'dde-list',
  templateUrl: './dde-list.component.html',
  styleUrls: ['./dde-list.component.css']
})
export class DdeListComponent implements OnInit {

  namesObservable: Observable<any[]>;

  //constructor(private db: AngularFireDatabase) { }
  constructor(private http: Http/*, private db: AngularFireDatabase */) { }

  ngOnInit() {
     this.namesObservable = this.getNames('/names');
  }

  getNames(listPath): Observable<any[]> {
    console.log("in get names");
    //return this.db.list(listPath).valueChanges();

/*
    var test =  this.http.get('/api/visitors')
    .map(response => {
        response.json(),
        console.log(response.json());
    });
*/

    this.http.get('/api/visitors').subscribe(
            data => {
               console.log("in dde-list");
                console.log(data.json());
            }
    );

    return null;
    //return this.db.list(listPath).valueChanges();

  }


}
