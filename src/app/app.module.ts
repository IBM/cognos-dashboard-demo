import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { DdeListComponent } from './dde-list/dde-list.component';

import { environment } from './../environments/environment';
import { FormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';

import { DdeCodeExplorerComponent } from './dde-code-explorer/dde-code-explorer.component';
import { DdeDashboardComponent } from './dde-dashboard/dde-dashboard.component';
import { DdeToasterComponent } from './dde-toaster/dde-toaster.component';

import { DdeApiService } from './services/dde-api.service';
import { EncryptService } from './services/encrypt.service';
import { CodeSnippetsRepoService } from './services/code-snippets-repo.service';
import { DdeDialogComponent } from './dde-dialog/dde-dialog.component';
import { DdeReferencesComponent } from './dde-references/dde-references.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { DdeCodeSnippetComponent } from './dde-code-snippet/dde-code-snippet.component';


/*
// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'dde',
    pathMatch: 'full'
  },
  {
    path: 'dde',
    component: DdeListComponent
  }
];*/

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    DdeListComponent,
    DdeCodeExplorerComponent,
    DdeDashboardComponent,
    DdeToasterComponent,
    DdeDialogComponent,
    DdeReferencesComponent,
    DdeCodeSnippetComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    HttpClientModule,
    AngularSvgIconModule
    //RouterModule.forRoot(ROUTES), // Add routes to the app
    //AngularFireModule.initializeApp(environment.firebase),
    //AngularFireDatabaseModule,
    //AngularFireAuthModule,
    //NgbModule.forRoot()
  ],
  providers: [
    DdeApiService,
    EncryptService,
    CodeSnippetsRepoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
