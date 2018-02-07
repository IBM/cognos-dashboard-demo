import { Component, ViewChild, AfterViewInit  } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'dde-dialog',
  templateUrl: './dde-dialog.component.html',
  styleUrls: ['./dde-dialog.component.css']
})
export class DdeDialogComponent implements AfterViewInit {
  @ViewChild('lgModal') public lgModal: ModalDirective;
  @ViewChild('ddeVideo') ddeVideo: any;

  constructor() {
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
  }

  hideModal() {
    this.lgModal.hide();
    this.ddeVideo.nativeElement.pause();
  }
}
