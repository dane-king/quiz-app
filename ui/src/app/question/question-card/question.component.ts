import { Question } from './question.model';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnChanges {
  @Input() question: Question;
  @Input() numQuestions: number;

  isFlipped = false;

  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;

  ngOnChanges(changes: SimpleChanges): void {
    this.reset();
  }
  
  reset(){
    this.isFlipped = false;
  }
  flipCard() {
    this.isFlipped = !this.isFlipped;
  }
}
