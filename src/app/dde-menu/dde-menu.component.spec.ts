import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdeMenuComponent } from './dde-menu.component';

import { DdeApiService } from '../services/dde-api.service';

import { MockBackend } from '@angular/http/testing';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

describe('DdeMenuComponent', () => {
  let component: DdeMenuComponent;
  let fixture: ComponentFixture<DdeMenuComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdeMenuComponent ],

      providers: [
        DdeApiService,
        {provide: Http, deps: [MockBackend]}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  /*
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  */

});
