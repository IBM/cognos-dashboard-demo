import { TestBed, async } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

import { HttpModule } from '@angular/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { DdeDashboardComponent } from './dde-dashboard/dde-dashboard.component';
import { DDEAppComponent } from './dde-app/dde-app.component';
import { DdeDialogComponent } from './dde-dialog/dde-dialog.component';
import { DdeDashboardBarComponent } from './dde-dashboard-bar/dde-dashboard-bar.component';
import { DdeMenuComponent } from './dde-menu/dde-menu.component';
import { DdeReferencesComponent } from './dde-references/dde-references.component';
import { DdeCodeSnippetComponent } from './dde-code-snippet/dde-code-snippet.component';
import { DdeCodeExplorerComponent } from './dde-code-explorer/dde-code-explorer.component';
import { DdeToasterComponent } from './dde-toaster/dde-toaster.component';

import { DdeApiService } from './services/dde-api.service';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        BsDropdownModule.forRoot(),
        AppRoutingModule,
        AngularSvgIconModule,
        ModalModule.forRoot(),
        AccordionModule.forRoot(),
        FormsModule,
      ],
      declarations: [
        AppComponent,
        AppNavbarComponent,
        DdeDashboardComponent,
        DDEAppComponent,
        DdeDialogComponent,
        DdeDashboardBarComponent,
        DdeMenuComponent,
        DdeReferencesComponent,
        DdeCodeSnippetComponent,
        DdeCodeExplorerComponent,
        DdeToasterComponent
      ],
      providers: [
        DdeApiService,
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  /*
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));*/
});
