/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogoutbuttonComponent } from 'src/app/components/logoutbutton/logoutbutton.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { ProfileCardComponent } from 'src/app/components/profilePage/profile-card/profile-card.component';
import { SupervisorCardComponent } from 'src/app/components/profilePage/supervisor-card/supervisor-card.component';
import { InternshipCardComponent } from 'src/app/components/profilePage/internship-card/internship-card.component';
import { CircularProgressBarComponent } from 'src/app/components/circular-progress-bar/circular-progress-bar.component';
import { SupervisorChartCardComponent } from 'src/app/components/profilePage/supervisor-chart-card/supervisor-chart-card.component';
import { PieChartComponent } from 'src/app/components/pie-chart/pie-chart.component';
import { ProfilePage } from './profile.page';
import { ProfilePageRoutingModule } from './profile-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
  ],
  declarations: [
    ProfilePage,
    SidebarComponent,
    LogoutbuttonComponent,
    ProfileCardComponent,
    SupervisorCardComponent,
    InternshipCardComponent,
    CircularProgressBarComponent,
    SupervisorChartCardComponent,
    PieChartComponent,
  ],
})
export class ProfilePageModule {}
