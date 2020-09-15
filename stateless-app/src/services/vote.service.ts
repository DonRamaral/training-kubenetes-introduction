import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  public questions: { id: string, text: string, yes: number, no: number }[] = [];

  constructor(public http: HttpClient) { }

  insertQuestion(text: string): Observable<any> {
    let question = { text: text, yes: 0, no: 0 };
    return this.http.post(APP_CONFIG.apiUrl + '/api/v1/questions', question);
  }

  getQuestionById(id: string): Observable<any> {
    return this.http.get(APP_CONFIG.apiUrl + `/api/v1/questions/${id}`);
  }

  listQuestions(): Observable<any> {
    return this.http.get(APP_CONFIG.apiUrl + '/api/v1/questions');
  }

  voteQuestion(question: any): Observable<any> {
    return this.http.put(APP_CONFIG.apiUrl + `/api/v1/questions/${question.id}`, question);
  }
}
