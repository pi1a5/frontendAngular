import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalCardOpenPage } from './modal-card-open.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCardOpenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalCardOpenPageRoutingModule {}
