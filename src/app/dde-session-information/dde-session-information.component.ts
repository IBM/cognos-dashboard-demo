import { Component, OnInit, Input } from '@angular/core';
import { Session } from '../../model/session';

@Component({
  selector: 'dde-session-information',
  templateUrl: './dde-session-information.component.html',
  styleUrls: ['./dde-session-information.component.css']
})
export class DdeSessionInformationComponent implements OnInit {

  @Input() session: Session

  constructor() { }

  ngOnInit() {
  }

}
