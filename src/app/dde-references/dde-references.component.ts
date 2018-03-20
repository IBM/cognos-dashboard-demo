import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AnalyticsService } from '../../instrumentation/analytics';
import * as resources from '../../assets/resources/resources.json';

@Component({
  selector: 'dde-references',
  templateUrl: './dde-references.component.html',
  styleUrls: ['./dde-references.component.css']
})
export class DdeReferencesComponent implements OnInit {
  @Output() isShowVideo: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit() {
  }

  showVideo(event) {
    this.isShowVideo.emit(true);
    // this.analyticsService.sendTrack((<any>resources).documents.video, event.currentTarget.href);
  }

  createInstance(event) {
    // this.analyticsService.sendTrack((<any>resources).documents.createInstance, event.currentTarget.href);
  }

  getDoc(event) {
    // this.analyticsService.sendTrack((<any>resources).documents.gettingStartedDocs, event.currentTarget.href);
  }

  joinDevWorks(event) {
    // this.analyticsService.sendTrack((<any>resources).documents.devworks, event.currentTarget.href);
  }

  viewGitHub(event) {
    // this.analyticsService.sendTrack((<any>resources).documents.github, event.currentTarget.href);
  }

  termsOfUse(event) {
    // this.analyticsService.sendTrack((<any>resources).documents.termsOfUse, event.currentTarget.href);
  }
}
