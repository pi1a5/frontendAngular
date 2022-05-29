import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartSupervisorsPage } from './chart-supervisors.page';

const routes: Routes = [
  {
    path: '',
    component: ChartSupervisorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartSupervisorsPageRoutingModule {}
