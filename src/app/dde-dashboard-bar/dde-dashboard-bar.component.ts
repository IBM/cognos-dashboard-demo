import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dde-dashboard-bar',
  templateUrl: './dde-dashboard-bar.component.html',
  styleUrls: ['./dde-dashboard-bar.component.css']
})
export class DdeDashboardBarComponent implements OnInit {
  @Input() disableButtons : boolean;
  constructor() { }

  ngOnInit() {
  }

  onDisableButtons() {
    let classes =  {
        disabled: this.disableButtons,
        enabled: !this.disableButtons
    };
    return classes;
  }
}
