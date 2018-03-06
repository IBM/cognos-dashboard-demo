import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { DdeApiService } from '../services/dde-api.service';
import { EncryptService } from '../services/encrypt.service';
import { DdeActionService } from '../services/dde-action.service';

import { DdeDashboardBarComponent } from './dde-dashboard-bar.component';

describe('DdeDashboardBarComponent', () => {
  let component: DdeDashboardBarComponent;
  let fixture: ComponentFixture<DdeDashboardBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        HttpClientModule,
        AngularSvgIconModule,
      ],
      declarations: [ DdeDashboardBarComponent ],
      providers: [
        DdeApiService,
        EncryptService,
        DdeActionService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdeDashboardBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


    it('should create', () => {
      expect(component).toBeTruthy();
    });

});
