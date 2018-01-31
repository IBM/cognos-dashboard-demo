import { Component, OnInit, Input } from '@angular/core';
import { Toaster } from '../../model/toaster';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'dde-toaster',
  templateUrl: './dde-toaster.component.html',
  styleUrls: ['./dde-toaster.component.css']
})
export class DdeToasterComponent implements OnInit {
  toaster : Toaster;
  private timer: Observable<any>;
  timerSub: Subscription;

  constructor() { }

  ngOnInit() {
  }

  showToaster(toaster) {
    this.toaster = toaster;

    if (this.timerSub !== undefined) {
      this.unsubscribeTimer();
    }

    this.timer = Observable.timer(environment.toaster_timer);
    this.timerSub = this.timer.subscribe(() => {
      this.hideToaster();
    });
  }

  hideToaster() {
    this.unsubscribeTimer();
    this.toaster.showToaster = false;
  }

  unsubscribeTimer() {
    this.timerSub.unsubscribe();
  }
}
