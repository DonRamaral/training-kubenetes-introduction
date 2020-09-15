import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VoteComponent } from './vote/vote.component';
import { RegisterComponent } from './register/register.component';
import { ListComponent } from './list/list.component';


const routes: Routes = [
  { path: "register", component: RegisterComponent },
  { path: "vote/:id", component: VoteComponent },
  { path: '', component: ListComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
