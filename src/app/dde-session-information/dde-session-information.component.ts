import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dde-session-information',
  templateUrl: './dde-session-information.component.html',
  styleUrls: ['./dde-session-information.component.css']
})
export class DdeSessionInformationComponent implements OnInit {

  @Input() sessionCode: string
  @Input() sessionId: string
  constructor() { }

  ngOnInit() {
  }

}
