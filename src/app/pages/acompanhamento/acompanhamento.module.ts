import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcompanhamentoPageRoutingModule } from './acompanhamento-routing.module';

import { AcompanhamentoPage } from './acompanhamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcompanhamentoPageRoutingModule
  ],
  declarations: [AcompanhamentoPage]
})
export class AcompanhamentoPageModule {}
