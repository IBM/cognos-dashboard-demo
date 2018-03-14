import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AnalyticsService } from '../../instrumentation/analytics';

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
    this.analyticsService.trackDocumentation('Overview Video', event.currentTarget.href);
  }

  createInstance(event) {
    this.analyticsService.trackDocumentation('Create Your Instance', event.currentTarget.href);
  }

  getDoc(event) {
    this.analyticsService.trackDocumentation('Getting Started Docs', event.currentTarget.href);
  }

  joinDevWorks(event) {
    this.analyticsService.trackDocumentation('DevWorks Community', event.currentTarget.href);
  }

  viewGitHub(event) {
    this.analyticsService.trackDocumentation('GitHub Demo Code', event.currentTarget.href);
  }

  termsOfUse(event) {
    this.analyticsService.trackDocumentation('Terms of Use', event.currentTarget.href);
  }
}
