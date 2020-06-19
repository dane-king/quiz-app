import { Question } from './question-card/question.model';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private http: HttpClient){}

  get(id: number): Observable<Question> {
    return this.http.get<Question>(`/question/${id}`);
  }
}
