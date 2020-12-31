import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageModule } from './HomePage/home-page.module';
import {ModalsComponent} from './modals/modals.component';
import { UserComponent } from './user/user.component';
import { PopupComponent } from './popup/popup.component';
import { PaginationComponent } from './pagination/pagination.component';
import {PagerService} from './_service/pager.service';



@NgModule({
  declarations: [
    AppComponent,
    ModalsComponent,
    UserComponent,
    PopupComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomePageModule
  ],
  providers: [
    PagerService
  ],
  exports: [
    PaginationComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
