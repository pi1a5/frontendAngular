/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModelCardClosedPage } from './model-card-closed.page';

const routes: Routes = [
  {
    path: '',
    component: ModelCardClosedPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModelCardClosedPageRoutingModule {}
