import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dde-code-explorer',
  templateUrl: './dde-code-explorer.component.html',
  styleUrls: ['./dde-code-explorer.component.css']
})
export class DdeCodeExplorerComponent implements OnInit {

  @Input() codeToDisplay: string;
  constructor() { }

  ngOnInit() {
  }

}
