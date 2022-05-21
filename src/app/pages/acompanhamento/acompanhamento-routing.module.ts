import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcompanhamentoPage } from './acompanhamento.page';

const routes: Routes = [
  {
    path: '',
    component: AcompanhamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcompanhamentoPageRoutingModule {}
