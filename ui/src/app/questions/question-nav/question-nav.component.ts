import { QuestionService } from '../question.service';
import { Component, OnInit } from '@angular/core';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Question } from '../question-card/question.model';


@Component({
  selector: 'app-question-nav',
  templateUrl: './question-nav.component.html',
  styleUrls: ['./question-nav.component.scss']
})
export class QuestionNavComponent implements OnInit {
  currentQuestion: Question;
  questions: Question[];
  numQuestions: number;
  prevQuestion: number;
  nextQuestion: number;

  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  constructor(private questionService: QuestionService) { }


  ngOnInit(): void {
    this.questionService.getAll().subscribe(questions => {
      this.questions = questions;
      this.numQuestions = questions.length;
      this.setCurrentQuestion(1);
    });
  }
  previous(){
    const prevValue = this.currentQuestion.id - 1;
    this.setCurrentQuestion(prevValue < 1 ? 1 : prevValue);
    this.setPrevNext();
  }
  next(){
    const prevValue = this.currentQuestion.id + 1;
    this.setCurrentQuestion(prevValue < 1 ? 1 : prevValue);
  }
  private setCurrentQuestion(currentQuestionNum: number){
    this.currentQuestion = this.questions[currentQuestionNum - 1];
    this.currentQuestion.id = currentQuestionNum;
    this.setPrevNext();

  }
  private setPrevNext(){
    this.nextQuestion = this.currentQuestion.id === this.numQuestions ? this.currentQuestion.id : this.currentQuestion.id + 1;
    this.prevQuestion = this.currentQuestion.id === 1 ? 1 : this.currentQuestion.id - 1;
  }

}
