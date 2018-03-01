import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { DDEAppComponent } from './dde-app.component';
import { AppNavbarComponent } from '../app-navbar/app-navbar.component';
import { DdeDialogComponent } from '../dde-dialog/dde-dialog.component';
import { DdeDashboardBarComponent } from '../dde-dashboard-bar/dde-dashboard-bar.component';
import { DdeMenuComponent } from '../dde-menu/dde-menu.component';
import { DdeReferencesComponent } from '../dde-references/dde-references.component';
import { DdeCodeExplorerComponent } from '../dde-code-explorer/dde-code-explorer.component';
import { DdeToasterComponent } from '../dde-toaster/dde-toaster.component';
import { DdeCodeSnippetComponent } from '../dde-code-snippet/dde-code-snippet.component';

import { CodeSnippetsRepoService } from '../services/code-snippets-repo.service';
import { DdeApiService } from '../services/dde-api.service';
import { EncryptService } from '../services/encrypt.service';
import { DdeActionService } from '../services/dde-action.service';

describe('DDEAppComponent', () => {
  let component: DDEAppComponent;
  let fixture: ComponentFixture<DDEAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule,
        HttpClientModule,
        AngularSvgIconModule,
        ModalModule.forRoot(),
        AccordionModule.forRoot(),
        FormsModule,
      ],
      declarations: [
        DDEAppComponent,
        AppNavbarComponent,
        DdeDialogComponent,
        DdeDashboardBarComponent,
        DdeMenuComponent,
        DdeReferencesComponent,
        DdeCodeExplorerComponent,
        DdeToasterComponent,
        DdeCodeSnippetComponent,
      ],
      providers: [
        //{ provide: CodeSnippetsRepoService, useValue: {} },
        CodeSnippetsRepoService,
        DdeApiService,
        EncryptService,
        DdeActionService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DDEAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
