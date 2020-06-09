import { StartComponent } from './start/start.component';
import { QuestionComponent } from './question/question-card/question.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'start',
    component: StartComponent,
  },
  { path: 'question/:id',
  component: QuestionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
