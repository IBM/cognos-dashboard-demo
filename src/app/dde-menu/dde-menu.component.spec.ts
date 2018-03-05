import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdeMenuComponent } from './dde-menu.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { DdeApiService } from '../services/dde-api.service';
import { EncryptService } from '../services/encrypt.service';
import { CodeSnippetsRepoService } from '../services/code-snippets-repo.service';

import { MockBackend } from '@angular/http/testing';
import {Http, Response, RequestOptions, Headers} from '@angular/http';

describe('DdeMenuComponent', () => {
  let component: DdeMenuComponent;
  let fixture: ComponentFixture<DdeMenuComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        HttpClientModule,
        AngularSvgIconModule,
        AccordionModule.forRoot(),

      ],
      declarations: [ DdeMenuComponent ],

      providers: [
        DdeApiService,
        EncryptService,
        CodeSnippetsRepoService,
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

    it('should create', () => {
      expect(component).toBeTruthy();
    });


});
