import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './HomePage/home-page.component';
import {ModalsComponent} from './modals/modals.component';
import {PaginationComponent} from './pagination/pagination.component';
import {AppComponent} from './app.component';

const routes: Routes = [
  {
    path: 'HomePage',
    component: HomePageComponent
  },
  {
    path: 'modals',
    component: ModalsComponent
  },
  {
    path: 'pagination',
    component: PaginationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppRoutingModule { }
