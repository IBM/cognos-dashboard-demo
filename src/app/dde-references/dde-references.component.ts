import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AnalyticsService } from '../../instrumentation/analytics';
import * as ref_resource from '../../assets/resources/references.json';

@Component({
  selector: 'dde-references',
  templateUrl: './dde-references.component.html',
  styleUrls: ['./dde-references.component.css']
})
export class DdeReferencesComponent implements OnInit {
  @Output() isShowVideo: EventEmitter<boolean> = new EventEmitter<boolean>();
  ref_resx = ref_resource;
  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit() {
  }

  showVideo(event) {
    this.isShowVideo.emit(true);
  }
}
