import { environment } from "./../../environments/environment";
import { Question } from "./question-card/question.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
//TODO:make sure hint works
export class QuestionService {
  baseUrl = `${environment.baseUrl}/questions`;
  constructor(private http: HttpClient) {
  }

  getAll(group?: string) {
    let url = this.baseUrl
      ;
    if (group) {
      url += `/${group}`;
    };

    return this.http.get<Question[]>(url);
  }
  add(question: Question) {
    return this.http.post<Question>(this.baseUrl
      , question);
  }
  edit(questions: Question[]) {
    return this.http.post<Question[]>(this.baseUrl
      , questions);
  }
  

}
