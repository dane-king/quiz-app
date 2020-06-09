import { Question } from './question.model';
import { QuestionService } from '../question.service';
import { Component, OnInit } from '@angular/core';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { tap, takeWhile, map, flatMap, mergeMap, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  question: Question;
  nextQuestion: number;
  prevQuestion: number;
  numQuestions = 3;
  isFlipped = false;

  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isFlipped = false;
    this.route.params.pipe(
      map(p => p.id),
      switchMap(q => this.questionService.get(q))
    ).subscribe(q => {
      this.question = q;
      this.nextQuestion = q.id + 1;
      this.prevQuestion = q.id - 1;
    });
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }
}
