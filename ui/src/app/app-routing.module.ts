import { QuestionNavComponent } from './features/questions/question-nav/question-nav.component';
import { QuestionListComponent } from './features/questions/question-list/question-list.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'edit',
    component: QuestionListComponent,
  },
  { path: 'questions',
  component: QuestionNavComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
