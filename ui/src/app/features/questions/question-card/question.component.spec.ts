import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Question } from 'src/app/core/models/questions';
import { QuestionComponent } from './question.component';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionComponent]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;

    component = fixture.componentInstance;

    const question: Question = {
      id: 1,
      answer: "Answer",
      question: "Question",
      hint: "this is a hint"
    };
    component.question = question;

    fixture.detectChanges();
  })

  it('should show question on load', () => {
    const cardDiv = fixture.debugElement.query(By.css('div.flippable-card'));
    const el = fixture.debugElement.query(By.css("mat-card-content.question")).nativeElement;
    expect(el.textContent).toContain("Question");
  });


  it('should change value of flipped on click', () => {
    const cardDiv = fixture.debugElement.query(By.css('div.flippable-card'));
    component.isFlipped = false;
    cardDiv.triggerEventHandler('click', {});
    fixture.debugElement.query(By.css("fa-icon[title ='hint']")).nativeElement;
    expect(component.isFlipped).toBeTrue();
  });

  it('should be able to hide hint if none available', () => {
    component.question.hint = undefined;
    fixture.detectChanges();
    const hintIcon = fixture.debugElement.query(By.css("fa-icon[title ='hint']"));
    expect(hintIcon).toBeNull();

  });

  it('should be able to click on hint', () => {
    const hintIcon = fixture.debugElement.query(By.css("fa-icon[title ='hint']")).nativeElement;
    expect(hintIcon).toBeDefined();

  });


});
