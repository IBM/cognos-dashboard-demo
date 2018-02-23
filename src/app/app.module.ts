import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';

import { environment } from './../environments/environment';
import { FormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { DdeCodeExplorerComponent } from './dde-code-explorer/dde-code-explorer.component';
import { DdeMenuComponent } from './dde-menu/dde-menu.component';
import { DdeToasterComponent } from './dde-toaster/dde-toaster.component';

import { DdeApiService } from './services/dde-api.service';
import { EncryptService } from './services/encrypt.service';
import { DdeActionService } from './services/dde-action.service';
import { CodeSnippetsRepoService } from './services/code-snippets-repo.service';
import { DdeDialogComponent } from './dde-dialog/dde-dialog.component';
import { DdeReferencesComponent } from './dde-references/dde-references.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { DdeCodeSnippetComponent } from './dde-code-snippet/dde-code-snippet.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { DDEAppComponent } from './dde-app/dde-app.component';
import { DdeDashboardComponent } from './dde-dashboard/dde-dashboard.component';
import { DdeDashboardBarComponent } from './dde-dashboard-bar/dde-dashboard-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,    
    DdeCodeExplorerComponent,
    DdeMenuComponent,
    DdeToasterComponent,
    DdeDialogComponent,
    DdeReferencesComponent,
    DdeCodeSnippetComponent,
    DDEAppComponent,
    DdeDashboardComponent,
    DdeDashboardBarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    HttpClientModule,
    AngularSvgIconModule,
    TooltipModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    DdeApiService,
    EncryptService,
    CodeSnippetsRepoService,
    DdeActionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
