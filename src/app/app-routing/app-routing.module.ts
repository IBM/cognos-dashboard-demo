import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DDEAppComponent } from '../dde-app/dde-app.component'


const routes: Routes = [
    {
        path: '',
        component: DDEAppComponent,
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
