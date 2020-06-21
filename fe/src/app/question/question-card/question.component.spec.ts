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
        { provide: ActivatedRoute, useValue: {params: of({id: questionId})}},
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
    expect(component.prevQuestion).toBe(1);
  });

  it('should not increment past numQuestions', () => {
    component.question.id = 2;
    fixture.detectChanges();
    expect(component.nextQuestion).toBe(component.numQuestions);
  });

  it('should change value of flipped on click', () => {
    const cardDiv =  fixture.debugElement.query(By.css('div.flippable-card'));
    component.isFlipped = false;
    cardDiv.triggerEventHandler('click', {});
    expect(component.isFlipped).toBeTrue();
  });

  it('should call Question service with question id', () => {
    expect(mockService.get).toHaveBeenCalledWith(2);
  });

  describe('Navigation', () => {
    it('should show previous and last question if not first or last', () => {
      component.question.id = 2;
      fixture.detectChanges();

      const previous =  fixture.debugElement.query(By.css('.questionNav a [title=previous]'));
      const next =  fixture.debugElement.query(By.css('.questionNav a [title=next]'));

      expect(previous).toBeTruthy();
      expect(next).toBeTruthy();
    });

    it('should not show beginning arrow at first question', () => {
      component.question.id = 1;
      fixture.detectChanges();
      const previous =  fixture.debugElement.query(By.css('.questionNav a [title=previous]'));

      expect(previous).toBeNull();
    });

    it('should not show ending arrow at last question', () => {
      component.question.id = component.numQuestions;
      fixture.detectChanges();

      const next =  fixture.debugElement.query(By.css('.questionNav  a fa-icon[title=next]'));

      expect(next).toBeNull();

    });


  });

});
