import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './HomePage/home-page.component';
import {ModalsComponent} from './modals/modals.component';

const routes: Routes = [
  {
    path: 'HomePage',
    component: HomePageComponent
  },
  {
    path: 'modals',
    component: ModalsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
