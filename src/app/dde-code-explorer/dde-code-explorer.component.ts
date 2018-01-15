import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DdeApiService } from '../dde-api.service';
import { Session } from '../../model/session';
import { CodeSnippet } from '../../model/code-snippet';

@Component({
  selector: 'dde-code-explorer',
  templateUrl: './dde-code-explorer.component.html',
  styleUrls: ['./dde-code-explorer.component.css']
})
export class DdeCodeExplorerComponent implements OnInit {

  @Output() session: EventEmitter<Session> = new EventEmitter<Session>();
  @Output() apiId: EventEmitter<string> = new EventEmitter<string>();
  @Input() codeSnippet : CodeSnippet;
  sessionTest : Session;

  constructor(private ddeApiService: DdeApiService) { }

  ngOnInit() {
  }

  setExplorerDiv() {
      let classes =  {
          divsmall: this.codeSnippet && this.codeSnippet.size === 'small',
          divlarge: !this.codeSnippet || this.codeSnippet.size === 'large'
      };
      return classes;
  }

  async runCode(event) {
    if (this.codeSnippet.selection === 1) {
      this.sessionTest = await this.ddeApiService.createNewSession();
      this.session.emit(this.sessionTest);
    }
    else if (this.codeSnippet.selection === 2) {
      this.apiId.emit(await this.ddeApiService.createAndInitApiFramework());
    }
  }

}
