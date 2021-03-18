import { environment } from "../../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Question } from "../../core/models/questions";

@Injectable({
  providedIn: "root",
})
//TODO:make sure hint works
export class QuestionService {
  baseUrl = `${environment.baseUrl}/questions`;
  constructor(private http: HttpClient) {
  }

  getAll(group?: string, limit?:number) {
    let url = this.baseUrl
      ;
    if (group) {
      url += `/${group}`;
    };
    if(limit){
      url += `/?num_items=${limit}`
    }

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
