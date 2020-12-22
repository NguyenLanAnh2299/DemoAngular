import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageModule } from './HomePage/home-page.module';
import {ModalsComponent} from './modals/modals.component';
import { UserComponent } from './user/user.component';



@NgModule({
  declarations: [
    AppComponent,
    ModalsComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomePageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
