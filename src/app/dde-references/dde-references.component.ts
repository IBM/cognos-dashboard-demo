import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dde-references',
  templateUrl: './dde-references.component.html',
  styleUrls: ['./dde-references.component.css']
})
export class DdeReferencesComponent implements OnInit {
  @Output() isShowVideo: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  showVideo() {
    this.isShowVideo.emit(true);
  }
}
