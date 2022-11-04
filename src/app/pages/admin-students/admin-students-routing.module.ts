import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminStudentsPage } from './admin-students.page';

const routes: Routes = [
  {
    path: '',
    component: AdminStudentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminStudentsPageRoutingModule {}
