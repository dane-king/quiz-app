import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';


import {MatTableModule } from "@angular/material/table";

import { HttpBackendProvider } from './http.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QuestionComponent } from './question/question-card/question.component';
import { QuestionNavComponent } from './question/question-nav/question-nav.component';
import { QuestionListComponent } from './question/question-list/question-list.component';




@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    QuestionListComponent,
    QuestionNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTableModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    HttpBackendProvider,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
