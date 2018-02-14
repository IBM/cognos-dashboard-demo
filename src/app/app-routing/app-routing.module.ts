import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DDEAppComponent } from '../dde-app/dde-app.component'
import { DdeDashboardComponent } from '../dde-dashboard/dde-dashboard.component'


const routes: Routes = [
    {
        path: '',
        component: DDEAppComponent,
    },
    {
        path: 'dashboard',
        component: DdeDashboardComponent,
    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
