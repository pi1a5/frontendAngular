import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioDeEstagioPageRoutingModule } from './inicio-de-estagio-routing.module';

import { InicioDeEstagioPage } from './inicio-de-estagio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioDeEstagioPageRoutingModule
  ],
  declarations: [InicioDeEstagioPage]
})
export class InicioDeEstagioPageModule {}
