import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { HttpBackendProvider } from './http.interceptor';
import { QuestionsModule } from './questions/questions.module';
import { TagsComponent } from './tags/tags.component';





@NgModule({
  declarations: [
    AppComponent,
    TagsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    HttpBackendProvider,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
