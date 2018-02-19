import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdeDashboardComponent } from './dde-dashboard.component';

import { DdeApiService } from '../dde-api.service';

import { MockBackend } from '@angular/http/testing';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

describe('DdeDashboardComponent', () => {
  let component: DdeDashboardComponent;
  let fixture: ComponentFixture<DdeDashboardComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdeDashboardComponent ],

      providers: [
        DdeApiService,
        {provide: Http, deps: [MockBackend]}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
