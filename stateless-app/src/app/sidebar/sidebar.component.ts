import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VoteService } from '../../services/vote.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  constructor(public voteService: VoteService,
    public router: Router) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
