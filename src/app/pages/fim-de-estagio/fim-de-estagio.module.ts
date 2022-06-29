/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FimDeEstagioPageRoutingModule } from './fim-de-estagio-routing.module';

import { FimDeEstagioPage } from './fim-de-estagio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FimDeEstagioPageRoutingModule,
  ],
  declarations: [FimDeEstagioPage],
})
export class FimDeEstagioPageModule {}
