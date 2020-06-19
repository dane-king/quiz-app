import { QuestionService } from './../question.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import { QuestionComponent } from './question.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;
  let questionId = 2;
  const mockService = jasmine.createSpyObj(QuestionService, {get: of({id: questionId})});


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionComponent ],
      providers: [
        {provide: QuestionService, useValue: mockService},
        { provide: ActivatedRoute, useValue: {params: of({id: 2})}},
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    questionId = 2;
  });

  it('should create Question Component', () => {
    expect(component).toBeTruthy();
  });

  it('should pass in question id', () => {
    expect(component.question.id).toBe(questionId);
  });
  it('should have next question', () => {
    expect(component.nextQuestion).toBe(questionId + 1);
  });
  it('should have previous question', () => {
    expect(component.prevQuestion).toBe(questionId - 1);
  });

  it('should decrement past zero', () => {
    questionId = 1;
    expect(component.prevQuestion).toBe(1);
  });

  it('should increment past numQuestions', () => {
    questionId = component.numQuestions;
    expect(component.nextQuestion).toBe(component.numQuestions);
  });

  it('should change value of flipped on click', () => {
    const cardDiv =  fixture.debugElement.query(By.css('div.flippable-card'));
    component.isFlipped = false;
    cardDiv.triggerEventHandler('click', {});
    expect(component.isFlipped).toBeTrue();
  });

  it('should call Question service with question id', () => {
    expect(mockService.get).toHaveBeenCalledWith(questionId);
  });
  // TODO: how to test that click went to next question


});
