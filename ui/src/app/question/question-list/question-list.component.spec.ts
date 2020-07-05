import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { QuestionListComponent } from "./question-list.component";
import { QuestionService } from "./../question.service";
import { By } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { nextTick } from "process";

describe("QuestionListComponent", () => {
  let component: QuestionListComponent;
  let fixture: ComponentFixture<QuestionListComponent>;
  const questionsFromService = [
    { question: "One", answer: "AnswerOne" },
    { question: "Two", answer: "AnswerTwo" },
    { question: "Three", answer: "AnswerThree" },
  ];
  const mockService = jasmine.createSpyObj(QuestionService, {
    getAll: of(questionsFromService),
  });

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [QuestionListComponent],
      providers: [{ provide: QuestionService, useValue: mockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  describe("Creating Component", () => {
    it("should create a list component", () => {
      expect(component).toBeTruthy();
    });
    it("should call Question service with question id", () => {
      expect(mockService.getAll).toHaveBeenCalled();
    });
    it("should have num questions equal to number of questions returned", () => {
      expect(component.numQuestions).toBe(component.questions.length);
    });

    it("should have question id of 1 when created", () => {
      expect(component.currentQuestion.id).toBe(1);
    });

    it("should have next question", () => {
      expect(component.nextQuestion).toBe(2);
    });
    it("should have previous question", () => {
      expect(component.prevQuestion).toBe(1);
    });
    it("should have current question", () => {
      expect(component.currentQuestion).toEqual({
        question: "One",
        answer: "AnswerOne",
        id: 1,
      });
    });
  });
  describe("Navigation", () => {
    it("should decrement past zero", () => {
      component.previous();
      fixture.detectChanges();
      expect(component.prevQuestion).toBe(1);
    });

    xit("should not increment past numQuestions", () => {
      component.currentQuestion.id = component.numQuestions;
      component.next();
      fixture.detectChanges();
      expect(component.nextQuestion).toBe(component.numQuestions);
    });

    it("should show previous and last question if not first or last", () => {
      component.next();
      fixture.detectChanges();

      const previous = fixture.debugElement.query(
        By.css(".questionNav a [title=previous]")
      );
      const next = fixture.debugElement.query(
        By.css(".questionNav a [title=next]")
      );

      expect(previous).toBeTruthy();
      expect(next).toBeTruthy();
    });

    it("should not show beginning arrow at first question", () => {
      component.currentQuestion.id = 1;
      fixture.detectChanges();
      const previous = fixture.debugElement.query(
        By.css(".questionNav a [title=previous]")
      );

      expect(previous).toBeNull();
    });

    xit("should not show ending arrow at last question", () => {
      component.numQuestions = 1;
      component.currentQuestion.id = 1;
      fixture.detectChanges();

      const next = fixture.debugElement.query(
        By.css(".questionNav  a fa-icon[title=next]")
      );

      expect(next).toBeNull();
    });
  });
});
