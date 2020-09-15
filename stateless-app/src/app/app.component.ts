import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { VoteService } from 'src/services/vote.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  private sub: any;

  constructor(public voteService: VoteService,
    private router: Router) {
    this.sub = this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((s: NavigationEnd) => {
        this.sub = this.fetchQuestions();
      });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  fetchQuestions() {
    this.sub = this.voteService.listQuestions().subscribe(response => {
      this.voteService.questions = response;
    });
  }
}
