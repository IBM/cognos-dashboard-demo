import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { DdeApiService } from '../dde-api.service';
import { CodeSnippet, CSVSourceCS, DB2SourceCS } from '../../model/code-snippet'

@Component({
  selector: 'dde-dashboard',
  templateUrl: './dde-dashboard.component.html',
  styleUrls: ['./dde-dashboard.component.css'],
})
export class DdeDashboardComponent implements OnInit {
  @Output() codeToRun = new EventEmitter<CodeSnippet>();

  constructor(private http: Http, private ddeApiService: DdeApiService ) {
  }

  ngOnInit() {
  }

  getAddSourceCode() {
    this.codeToRun.emit(CSVSourceCS);
  }

  addProtectedDb2SampleSourceToDashboard(event) {
    //this.ddeApiService.addProtectedDb2SampleSource(this.db2_sample_module);
  }

}
