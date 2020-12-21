import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question-card/question.component';
import { QuestionNavComponent } from './question-nav/question-nav.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    QuestionComponent,
    QuestionListComponent,
    QuestionNavComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    FontAwesomeModule,
  ],
  exports:[
    
  ]
})
export class QuestionsModule { }


