import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  private sub: any;
  public questions: any;

  constructor(public questionService: QuestionService,
    public router: Router) {
    this.fetchQuestions();
  }

  fetchQuestions() {
    this.sub = this.questionService.listQuestions().subscribe(response => {
      this.questions = response;
    });
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onClickQuestion(question: any) {
    this.router.navigate([ 'vote', question.id ]);
  }
}
