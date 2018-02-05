import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {

  showPanel: boolean = false;
  @Output() showPanels: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {
  }

  ngOnInit() {
    this.showHidePanels();
  }

  showHidePanels() {
    this.showPanel = !this.showPanel;
    this.showPanels.emit(this.showPanel);
  }

}
