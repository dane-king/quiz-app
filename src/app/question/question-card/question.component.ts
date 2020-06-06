import { Question } from './question.model';
import { QuestionService } from '../question.service';
import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { tap, takeWhile, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  question$: Observable<Question>;
  questionNum: number;
  numQuestions = 10;
  isFlipped = false;

  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;


  constructor(private questionService: QuestionService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(p => this.questionNum = p.id);
    this.question$ = this.questionService.get(this.questionNum);
    this.isFlipped = false;
  }

}
