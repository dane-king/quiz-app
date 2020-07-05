import { environment } from "./../../environments/environment";
import { Question } from "./question-card/question.model";
import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class QuestionService {
  baseUrl = "";
  constructor(private http: HttpClient) {
    if (!environment.mockBackend) {
      this.baseUrl = environment.baseUrl;
    }
  }
  getAll(group?: string) {
    return this.http.get<Question[]>(`${this.baseUrl}/questions`);
  }
}
