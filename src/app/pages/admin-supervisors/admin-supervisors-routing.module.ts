import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminSupervisorsPage } from './admin-supervisors.page';

const routes: Routes = [
  {
    path: '',
    component: AdminSupervisorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminSupervisorsPageRoutingModule {}
