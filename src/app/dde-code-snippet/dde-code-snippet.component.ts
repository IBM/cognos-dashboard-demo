import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'dde-code-snippet',
  templateUrl: './dde-code-snippet.component.html',
  styleUrls: ['./dde-code-snippet.component.css']
})
export class DdeCodeSnippetComponent implements OnInit {
  @Input() codeType: string;
  cognos_url: string;
  constructor() {
    this.cognos_url = environment.cognos_root_url;
  }

  ngOnInit() {
  }

}
