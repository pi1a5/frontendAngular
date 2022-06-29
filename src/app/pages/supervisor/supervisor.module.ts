/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SupervisorPageRoutingModule } from './supervisor-routing.module';

import { SupervisorPage } from './supervisor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupervisorPageRoutingModule,
    Ng2SearchPipeModule,
  ],
  declarations: [SupervisorPage],
})
export class SupervisorPageModule {}
