import { Component, ViewChild, AfterViewInit  } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AnalyticsService } from '../../instrumentation/analytics';
import * as dialog_resource from '../../assets/resources/dialog.json';
import * as resources from '../../assets/resources/resources.json';
import { VideoTraits } from '../../interfaces/videoTraits';

@Component({
  selector: 'dde-dialog',
  templateUrl: './dde-dialog.component.html',
  styleUrls: ['./dde-dialog.component.css']
})
export class DdeDialogComponent implements AfterViewInit {
  @ViewChild('lgModal') public lgModal: ModalDirective;
  @ViewChild('ddeVideo') ddeVideo: any;
  private isCheckboxChecked: boolean = false;
  private traits: VideoTraits;
  dialog_resx = dialog_resource;

  constructor(private analyticsService: AnalyticsService) {
  }

  ngAfterViewInit() {
    if (JSON.parse(localStorage.getItem('showVideo')) ||
        JSON.parse(localStorage.getItem('showVideo')) === null)
      this.showModal(false);
    else
      this.hideModal();
  }

  showModal(shouldTrack: boolean) {
    let totalTime = '0:' + Math.floor(this.ddeVideo.nativeElement.duration);
    this.ddeVideo.nativeElement.load();
    this.lgModal.show();

    if (shouldTrack) {
      this.traits = { productTitle: (<any>resources).productTitle, sessionId: this.analyticsService.sessionId,
                totalLength: totalTime, position: '0:00', customName1: 'doNotDisplayAgain', customValue1: this.isCheckboxChecked}

      this.analyticsService.sendTrack((<any>resources).videoPlaybackStarted, this.traits);
    }
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
      this.traits = { productTitle: (<any>resources).productTitle, sessionId: this.analyticsService.sessionId,
                totalLength: totalTime, position: timeElasped, customName1: 'doNotDisplayAgain', customValue1: this.isCheckboxChecked}

      this.analyticsService.sendTrack((<any>resources).videoPlaybackCompleted, this.traits);
    }
  }
}
