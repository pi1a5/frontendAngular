/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NgChartsModule } from 'ng2-charts';
import { ChartSupervisorsPageRoutingModule } from './chart-supervisors-routing.module';

import { ChartSupervisorsPage } from './chart-supervisors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartSupervisorsPageRoutingModule,
    NgChartsModule,
  ],
  declarations: [ChartSupervisorsPage],
})
export class ChartSupervisorsPageModule {}
