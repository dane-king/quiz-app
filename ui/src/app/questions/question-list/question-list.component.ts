import { Component, OnInit } from '@angular/core';
import { Question } from '../question-card/question.model';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})

export class QuestionListComponent implements OnInit {
  questions: Question[];

  constructor(private questionService:QuestionService) { }

  ngOnInit(): void {    
    this.questionService.getAll().subscribe(questions => {
      this.questions = questions;
    });
  }

}
