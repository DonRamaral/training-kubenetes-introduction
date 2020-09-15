import { Component, OnDestroy, OnInit } from '@angular/core';
import { VoteService } from '../../services/vote.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  private sub: any;
  public questions: any;

  constructor(public voteService: VoteService) {
    this.fetchQuestions();
  }

  fetchQuestions() {
    this.sub = this.voteService.listQuestions().subscribe(response => {
      this.questions = response;
    });
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
