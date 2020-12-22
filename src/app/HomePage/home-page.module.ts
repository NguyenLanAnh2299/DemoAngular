import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page.component';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    HomePageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
})
export class HomePageModule{ }
