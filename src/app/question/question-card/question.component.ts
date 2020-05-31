import { Question } from './question.model';
import { QuestionService } from '../question.service';
import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { tap, takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  question$: Observable<Question>;
  numQuestions = 10;
  isFlipped = false;

  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;


  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.question$=this.questionService.get(1);
    this.isFlipped = false;
  }

}
