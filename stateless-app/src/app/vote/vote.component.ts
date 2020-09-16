import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit, OnDestroy {

  private sub: any;

  public votes: number;
  public question: any = { text: '', yes: 0, no: 0 };

  constructor(public questionService: QuestionService,
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
    this.vote(1, 0);
  }

  onVoteNo() {
    this.question.no++;
    this.vote(0, 1);
  }

  fetchQuestion(id: string) {
    this.questionService.getQuestionById(id).subscribe(response => {
      this.question = response;
    });
  }

  vote(yes: number, no: number) {
    this.sub = this.questionService.voteQuestion(this.question.id, yes, no).subscribe(response => {
      this.router.navigate(['/']);
    });
  }
}
