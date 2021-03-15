import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { QuestionService } from './question.service';
import { environment } from 'src/environments/environment';
import * as mockQuestions from "../mock/questions.json";
import { Question } from '../models/questions';

export const baseUrl = `${environment.baseUrl}/questions`;

describe('QuestionService', () => {
  let service: QuestionService;
  let httpMock: HttpTestingController;

  const flushRequest = (url: string) => httpMock.expectOne(url).flush(mockQuestions);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        QuestionService
      ]
    });
    service = TestBed.inject(QuestionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created be able to make a call to questions', () => {
    service.getAll().subscribe((questions: Question[]) =>
      expect(JSON.stringify(questions)).toEqual(JSON.stringify(mockQuestions)));
    flushRequest(baseUrl);

  });
  it('should be created be able to pass in group to question', () => {
    const category = "math"
    service.getAll(category).subscribe((questions: Question[]) => expect(JSON.stringify(questions)).toEqual(JSON.stringify(mockQuestions)));
    flushRequest(`${baseUrl}/${category}`);

  });

  it('should be created be able to limit number of questions with category', () => {
    const category = "math"
    const numItems = 2
    service.getAll(category, numItems).subscribe((questions: Question[]) => expect(JSON.stringify(questions)).toEqual(JSON.stringify(mockQuestions)));
    flushRequest(`${baseUrl}/${category}/?num_items=${numItems}`);
  });
  it('should be created be able to limit number of questions', () => {
    const numItems = 2
    service.getAll('',numItems).subscribe((questions: Question[]) => expect(JSON.stringify(questions)).toEqual(JSON.stringify(mockQuestions)));
    flushRequest(`${baseUrl}/?num_items=${numItems}`);
  });
  it('should be able to update questions', () => {
    const withoutId = mockQuestions[2];
    service.edit([withoutId]).subscribe((question: Question[]) => {
      expect(JSON.stringify([withoutId])).toEqual(JSON.stringify([withoutId]));
    });
    flushRequest(baseUrl);

  });
  it('should be able to create a question', () => {
    const lastQuestion = mockQuestions[3];
    service.add(lastQuestion).subscribe((question: Question) => {
      expect(JSON.stringify(lastQuestion)).toEqual(JSON.stringify(lastQuestion));
    });
    const req = httpMock.expectOne(baseUrl);
    req.flush(mockQuestions);
  });

});
