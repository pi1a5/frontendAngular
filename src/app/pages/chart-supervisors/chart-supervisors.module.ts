/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NgChartsModule } from 'ng2-charts';
import { ChartComponent } from 'src/app/components/chart/chart.component';
import { LogoutbuttonComponent } from 'src/app/components/logoutbutton/logoutbutton.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { PieCoursesComponent } from 'src/app/components/pie-courses/pie-courses.component';
import { ChartSupervisorsPageRoutingModule } from './chart-supervisors-routing.module';

import { ChartSupervisorsPage } from './chart-supervisors.page';
import { BarCoursesComponent } from 'src/app/components/bar-courses/bar-courses.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartSupervisorsPageRoutingModule,
    NgChartsModule,
  ],
  declarations: [
    ChartSupervisorsPage,
    ChartComponent,
    LogoutbuttonComponent,
    SidebarComponent,
    PieCoursesComponent,
    BarCoursesComponent,
  ],
})
export class ChartSupervisorsPageModule { }
