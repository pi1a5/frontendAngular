/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupervisorPage } from './supervisor.page';

const routes: Routes = [
  {
    path: '',
    component: SupervisorPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupervisorPageRoutingModule {}
