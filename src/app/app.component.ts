import { Component, OnInit } from '@angular/core';
import { ScriptService } from './services/script.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ ScriptService]
})
export class AppComponent implements OnInit {

   constructor(private script: ScriptService) {
  }

  ngOnInit() {
    this.script.load('cognosapijs').then(data => {
    console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }

}
