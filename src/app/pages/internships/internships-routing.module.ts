import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InternshipsPage } from './internships.page';

const routes: Routes = [
  {
    path: '',
    component: InternshipsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InternshipsPageRoutingModule {}
