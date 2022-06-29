/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectTicketTypePage } from './select-ticket-type.page';

const routes: Routes = [
  {
    path: '',
    component: SelectTicketTypePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectTicketTypePageRoutingModule {}
