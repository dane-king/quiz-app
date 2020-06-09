import { QuestionService } from './../question.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import { QuestionComponent } from './question.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AppModule } from 'src/app/app.module';

fdescribe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;
  const questionId = 2;
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

  it('should create Question Component', () => {
    expect(component).toBeTruthy();
  });

  it('should pass in question id', () => {
    expect(component.question.id).toBe(questionId);
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
