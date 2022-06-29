/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FimDeEstagioPage } from './fim-de-estagio.page';

const routes: Routes = [
  {
    path: '',
    component: FimDeEstagioPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FimDeEstagioPageRoutingModule {}
