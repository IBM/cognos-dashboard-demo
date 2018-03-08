import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { DdeDashboardComponent } from './dde-dashboard.component';
import { AppNavbarComponent } from '../app-navbar/app-navbar.component';
import { DdeDialogComponent } from '../dde-dialog/dde-dialog.component';
import { DdeDashboardBarComponent } from '../dde-dashboard-bar/dde-dashboard-bar.component';

import { DdeApiService } from '../services/dde-api.service';
import { EncryptService } from '../services/encrypt.service';
import { DdeActionService } from '../services/dde-action.service';

describe('DdeDashboardComponent', () => {
  let component: DdeDashboardComponent;
  let fixture: ComponentFixture<DdeDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        HttpClientModule,
        AngularSvgIconModule,
        ModalModule.forRoot(),
      ],
      declarations: [
        DdeDashboardComponent,
        AppNavbarComponent,
        DdeDialogComponent,
        DdeDashboardBarComponent,
      ],
      providers: [
        DdeApiService,
        EncryptService,
        DdeActionService,
      ],
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
