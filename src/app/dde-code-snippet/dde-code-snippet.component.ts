import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../environments/environment';

declare var Prism: any;

@Component({
  selector: 'dde-code-snippet',
  templateUrl: './dde-code-snippet.component.html',
  styleUrls: ['./dde-code-snippet.component.css']
})
export class DdeCodeSnippetComponent implements OnInit {
  private type: string;
  cognos_url: string;
  constructor() {
    this.cognos_url = environment.cognos_root_url;
  }

  ngOnInit() {

  }

  @Input() set codeType(codeType: string) {
    this.type = codeType;

    setTimeout(function() {
      Prism.highlightAll();
    }, 0);
}
