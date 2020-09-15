import { Component, OnDestroy, OnInit } from '@angular/core';
import { VoteService } from '../../services/vote.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  private sub: any;
  public text: string;

  constructor(public voteService: VoteService, public router: Router) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.sub)
      this.sub.unsubscribe();
  }

  onRegister() {
    if (this.text == undefined || this.text.trim() == '') {
      alert('Question cannot be empty');
      this.text = '';
    }
    else {
      this.sub = this.voteService.insertQuestion(this.text).subscribe(response => {
        this.router.navigate(['vote', response.id]);
      });
    }
  }
}
