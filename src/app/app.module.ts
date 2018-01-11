import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { DdeListComponent } from './dde-list/dde-list.component';

import { environment } from './../environments/environment';
import { FormsModule } from '@angular/forms';

/*import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';*/

import { DdeSessionComponent } from './dde-session/dde-session.component';
import { DdeCodeExplorerComponent } from './dde-code-explorer/dde-code-explorer.component';
import { DdeDashboardComponent } from './dde-dashboard/dde-dashboard.component';
import { DdeApiService } from './dde-api.service';
import { DdeSessionInformationComponent } from './dde-session-information/dde-session-information.component';

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
    DdeSessionComponent,
    DdeCodeExplorerComponent,
    DdeDashboardComponent,
    DdeSessionInformationComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    //RouterModule.forRoot(ROUTES), // Add routes to the app
    /*AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,*/
    NgbModule.forRoot(),
    FormsModule
  ],
  providers: [ DdeApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
