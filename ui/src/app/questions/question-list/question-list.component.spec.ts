import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { QuestionService } from '../question.service';

import { QuestionListComponent } from './question-list.component';

describe('QuestionListComponent', () => {
  let component: QuestionListComponent;
  let fixture: ComponentFixture<QuestionListComponent>;
  let el: any;
  const questionsFromService = [
    { id:1, question: "One", answer: "AnswerOne", category:["test"] },
    { id:2, question: "Two", answer: "AnswerTwo" },
    { id:3, question: "Three", answer: "AnswerThree", category:["test"] },
    { id:4, question: "Four", answer: "AnswerFour", category:["test", "test1"] },
  ];
  const mockService = jasmine.createSpyObj(QuestionService, {
    getAll: of(questionsFromService),
  });


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionListComponent ],
      providers: [{ provide: QuestionService, useValue: mockService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el=fixture.debugElement.nativeElement;
  });
  
  it('should have a display questions from the service', () => {
    const questionCards = el.querySelectorAll('app-question');
    expect(questionCards.length).toBe(4)
  });
  it('should be able to be edited', () => {
    const button:HTMLButtonElement=fixture.nativeElement.querySelector('button');
    expect(button.textContent).toBe('Edit');
   });

});
