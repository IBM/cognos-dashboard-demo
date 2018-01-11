import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DdeApiService } from '../dde-api.service';
import { Session } from '../../model/session';

@Component({
  selector: 'dde-code-explorer',
  templateUrl: './dde-code-explorer.component.html',
  styleUrls: ['./dde-code-explorer.component.css']
})
export class DdeCodeExplorerComponent implements OnInit {

  @Output() session: EventEmitter<Session> = new EventEmitter<Session>();
  @Input() codeToDisplay: string;
  @Input() selection: number;

  constructor(private ddeApiService: DdeApiService) { }

  ngOnInit() {
  }

  async runCode(event) {
    if (this.selection === 1) {
      this.session.emit(await this.ddeApiService.createNewSession());
    }
  }

}
