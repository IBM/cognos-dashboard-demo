import { Component, ViewChild, AfterViewInit  } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AnalyticsService } from '../../instrumentation/analytics';
import * as resources from '../../assets/resources/resources.json';

@Component({
  selector: 'dde-dialog',
  templateUrl: './dde-dialog.component.html',
  styleUrls: ['./dde-dialog.component.css']
})
export class DdeDialogComponent implements AfterViewInit {
  @ViewChild('lgModal') public lgModal: ModalDirective;
  @ViewChild('ddeVideo') ddeVideo: any;
  private isCheckboxChecked: boolean = false;

  constructor(private analyticsService: AnalyticsService) {
  }

  ngAfterViewInit() {
    if (JSON.parse(localStorage.getItem('showVideo')) ||
        JSON.parse(localStorage.getItem('showVideo')) === null)
      this.showModal();
    else
      this.hideModal();
  }

  showModal() {
    this.ddeVideo.nativeElement.load();
    this.lgModal.show();
  }

  toogleVideo(event) {
    let showVideo = event.target.checked ? 'false' : 'true';
    localStorage.setItem('showVideo', showVideo);
    this.isCheckboxChecked = event.target.checked;
  }

  hideModal() {
    this.lgModal.hide();
    this.ddeVideo.nativeElement.pause();

    if (!Number.isNaN(this.ddeVideo.nativeElement.duration)) {
      let timeElasped = '0:' + Math.floor(this.ddeVideo.nativeElement.currentTime);
      let totalTime = '0:' + Math.floor(this.ddeVideo.nativeElement.duration);

      this.analyticsService.trackVideo((<any>resources).actions.videoClose.name, timeElasped + ' / ' + totalTime, this.isCheckboxChecked);
    }
  }
}
