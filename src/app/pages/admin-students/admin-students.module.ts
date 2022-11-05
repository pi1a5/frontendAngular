/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentsListComponent } from 'src/app/components/students-list/students-list.component';
import { LogoutbuttonComponent } from 'src/app/components/logoutbutton/logoutbutton.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AdminStudentsPage } from './admin-students.page';
import { AdminStudentsPageRoutingModule } from './admin-students-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminStudentsPageRoutingModule,
    Ng2SearchPipeModule,
  ],
  declarations: [
    AdminStudentsPage,
    LogoutbuttonComponent,
    SidebarComponent,
    StudentsListComponent,
  ],
})
export class AdminStudentsPageModule { }
