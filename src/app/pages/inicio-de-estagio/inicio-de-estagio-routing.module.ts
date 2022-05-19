import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioDeEstagioPage } from './inicio-de-estagio.page';

const routes: Routes = [
  {
    path: '',
    component: InicioDeEstagioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioDeEstagioPageRoutingModule {}
