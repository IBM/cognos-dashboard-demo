import { Component, ViewChild, AfterViewInit  } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'dde-dialog',
  templateUrl: './dde-dialog.component.html',
  styleUrls: ['./dde-dialog.component.css']
})
export class DdeDialogComponent implements AfterViewInit {
  @ViewChild('lgModal') public lgModal: ModalDirective;

  constructor() {
  }

  ngAfterViewInit() {
    this.showModal();
  }

  showModal() {
    this.lgModal.show();
  }

  hideModal() {
    this.lgModal.hide();
  }

}
