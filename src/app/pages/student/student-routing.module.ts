/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentPage } from './student.page';

const routes: Routes = [
  {
    path: '',
    component: StudentPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentPageRoutingModule {}
