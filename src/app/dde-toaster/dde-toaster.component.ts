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

  getClass() {
      let classes =  {
          'fa-check-circle': this.toaster && this.toaster.type === 'success',
          'fa-exclamation-circle': this.toaster && this.toaster.type === 'failure',
          'fa-exclamation-triangle': this.toaster && this.toaster.type === 'warning',
      };
      return classes;
  }
}
