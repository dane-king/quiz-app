import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { delay, mergeMap, materialize, dematerialize } from "rxjs/operators";

import data from "./mock/questions.json";
import { Question } from "./question/question-card/question.model";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;
    const isMockBackEnd = environment.mockBackend;
    // tslint:disable-next-line: max-line-length
    // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
    // wrap in delayed observable to simulate server api call
    const handleRequest$ = of(null).pipe(mergeMap(handleRoute));
    return isMockBackEnd
      ? handleRequest$.pipe(materialize(), delay(500), dematerialize())
      : handleRequest$;

    function handleRoute() {
      switch (true) {
        case url.startsWith(environment.baseUrl):
          return next.handle(request);
        case url.endsWith("/questions") && method === "GET":
          return startQuiz();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function startQuiz() {
      return ok(data);
    }



    // helper functions

    function ok(reqBody?: Question[]) {
      return of(
        new HttpResponse({
          body: reqBody,
          headers,
          status: 200,
        })
      );
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function idFromUrl() {
      const urlParts = url.split("/");
      return parseInt(urlParts[urlParts.length - 1], 10);
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
