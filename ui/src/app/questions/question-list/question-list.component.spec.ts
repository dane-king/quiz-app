import { Output } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { QuestionService } from '../question.service';

import { QuestionListComponent } from './question-list.component';

describe('QuestionListComponent', () => {
  let component: QuestionListComponent;
  let fixture: ComponentFixture<QuestionListComponent>;
  let ul:HTMLUListElement;
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
    ul = fixture.nativeElement.querySelector('ul');
  });

  it('should have a display questions from the service', () => {
    const outputText=ul.textContent;
    expect(outputText).toContain("1OneAnswerOnetest");
    expect(outputText).toContain("4FourAnswerFourtest,test1");
  });
  it('should be able to be edited', () => {
    
    
  });

});
