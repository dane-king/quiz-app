import { QuestionService } from '../question.service';
import { Component, OnInit } from '@angular/core';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Question } from 'src/app/models/questions';


@Component({
  selector: 'app-question-nav',
  templateUrl: './question-nav.component.html',
  styleUrls: ['./question-nav.component.scss']
})
export class QuestionNavComponent implements OnInit {
  currentQuestion: number;
  questions: Question[];
  numQuestions: number;

  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  constructor(private questionService: QuestionService) { }


  ngOnInit(): void {
    this.questionService.getAll().subscribe(questions => {
      this.questions = questions;
      this.numQuestions = questions.length;
      this.currentQuestion = 1;
    });
  }
  previous() {
    if (this.currentQuestion > 1) {
      this.currentQuestion -= 1;
    }
  }
  next() {
    if (this.currentQuestion < this.numQuestions) {
      this.currentQuestion += 1;
    }
  }
  getCurrentQuestion() {
    return this.questions[this.currentQuestion - 1];
  }
}
