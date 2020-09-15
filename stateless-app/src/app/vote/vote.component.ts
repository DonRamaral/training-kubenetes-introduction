import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VoteService } from '../../services/vote.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit, OnDestroy {

  private sub: any;

  public votes: number;
  public question: any = { text: '', yes: 0, no: 0 };

  constructor(public voteService: VoteService,
    private route: ActivatedRoute,
    public router: Router) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.fetchQuestion(params['id']);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onVoteYes() {
    this.question.yes++;
    this.vote();
  }

  onVoteNo() {
    this.question.no++;
    this.vote();
  }

  fetchQuestion(id: string) {
    this.voteService.getQuestionById(id).subscribe(response => {
      this.question = response;
    });
  }

  vote() {
    this.sub = this.voteService.voteQuestion(this.question).subscribe(response => {
      this.router.navigate(['/']);
    });
  }
}
