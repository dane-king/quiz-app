import { QuestionService } from './../question.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import { QuestionComponent } from './question.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Question } from './question.model';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    component.question = new Question();
    component.question.id = 1;
    component.numQuestions = 3;
    component.question = new Question();

    fixture.detectChanges();

  });

  it('should create Question Component', () => {
    expect(component).toBeTruthy();
  });


  it('should change value of flipped on click', () => {
    const cardDiv =  fixture.debugElement.query(By.css('div.flippable-card'));
    component.isFlipped = false;
    cardDiv.triggerEventHandler('click', {});
    expect(component.isFlipped).toBeTrue();
  });

  it('should be able to click', () => {
    
  });


});
