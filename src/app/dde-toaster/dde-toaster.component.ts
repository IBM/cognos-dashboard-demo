import { Component, OnInit, Input } from '@angular/core';
import { Toaster } from '../../model/toaster';



@Component({
  selector: 'dde-toaster',
  templateUrl: './dde-toaster.component.html',
  styleUrls: ['./dde-toaster.component.css']
})
export class DdeToasterComponent implements OnInit {
  @Input() toaster : Toaster;

  constructor() { }

  ngOnInit() {
  }

  hideToaster() {
    this.toaster.showToaster = false;
  }
}
