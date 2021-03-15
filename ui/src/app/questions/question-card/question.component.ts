import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import {
  faChevronLeft,
  faChevronRight,
  faLightbulb
} from '@fortawesome/free-solid-svg-icons';
import { Question } from 'src/app/models/questions';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
//TODO: Button to flip card
//TODO: Show hint text
export class QuestionComponent implements OnChanges {
  @Input() question: Question;

  isFlipped = false;
  showHint = false;

  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  faLightbulb = faLightbulb;


  ngOnChanges(changes: SimpleChanges): void {
    this.reset();
  }

  displayHint() {
    this.showHint=true;
  }

  reset(){
    this.isFlipped = false;
  }
  flipCard() {
    this.isFlipped = !this.isFlipped;
  }
}

