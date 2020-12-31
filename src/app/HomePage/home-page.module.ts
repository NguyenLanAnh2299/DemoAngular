import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page.component';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from '../app.component';


@NgModule({
  declarations: [
    HomePageComponent
  ],
  bootstrap: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HomePageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbPaginationModule,
  ],
  providers: [],
  entryComponents: [
  ],

})
export class HomePageModule{ }
