import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { QuestionService } from './question.service';
import { Question } from './question-card/question.model';
import { environment } from 'src/environments/environment';
import * as mockQuestions from "../mock/questions.json";

export const baseUrl=`${environment.baseUrl}/questions`;

describe('QuestionService', () => {
  let service: QuestionService;
  let httpMock: HttpTestingController;
  
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
    service.getAll().subscribe((questions:Question[])=>{
      expect(JSON.stringify(questions)).toEqual(JSON.stringify(mockQuestions));
    });
    const req = httpMock.expectOne(baseUrl );
    req.flush(mockQuestions);

  });
  it('should be created be able to pass in group to question', () => {
    const category="math"
    service.getAll(category).subscribe((questions:Question[])=>{
      expect(JSON.stringify(questions)).toEqual(JSON.stringify(mockQuestions));
    });
    const req = httpMock.expectOne(`${baseUrl}/${category}`);
    req.flush(mockQuestions);

  });
  it('should be able to update questions', () => {
    const withoutId=mockQuestions[2];
    service.edit([withoutId]).subscribe((question:Question[])=>{
      expect(JSON.stringify([withoutId])).toEqual(JSON.stringify([withoutId]));
    });
    const req = httpMock.expectOne(baseUrl);
    req.flush(mockQuestions);
    
  });
  it('should be able to create a question', () => {
    const lastQuestion=mockQuestions[3];
    service.add(lastQuestion).subscribe((question:Question)=>{
      expect(JSON.stringify(lastQuestion)).toEqual(JSON.stringify(lastQuestion));
    });
    const req = httpMock.expectOne(baseUrl);
    req.flush(mockQuestions);
  });
  
});
