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

import { Session, SessionKey } from '../../model/session';

class MockDdeApiService {
  session = null;
  dashboardAPI = null;

  async createNewSession() {
    return this.session;
  }

  async createAndInitApiFramework() {
    return "mocked api id";
  }

  async openDashboard() {;
    return this.dashboardAPI;
  }
}


describe('DdeDashboardComponent', async () => {
  let component: DdeDashboardComponent;
  let fixture: ComponentFixture<DdeDashboardComponent>;
  let testDdeApiService: MockDdeApiService;

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
        {provide: DdeApiService, useClass: MockDdeApiService},
        EncryptService,
        DdeActionService,
      ],



    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdeDashboardComponent);
    component = fixture.componentInstance;

    // UserService provided to the TestBed
   testDdeApiService = TestBed.get(DdeApiService);

  });

  afterEach(() => {
     testDdeApiService = null;
     component = null;
   });

  it('should have a property \'disableDashboardBarButtons\' with the value \'false\'',
    async(() => {
       fixture.detectChanges();
       fixture.whenStable().then(() => {
        fixture.detectChanges();
         expect(component.disableDashboardBarButtons).toEqual(false);
      });
   }));

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

});
