import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminStudentsPageRoutingModule } from './admin-students-routing.module';

import { AdminStudentsPage } from './admin-students.page';
import { StudentsListComponent } from 'src/app/components/students-list/students-list.component';
import { LogoutbuttonComponent } from 'src/app/components/logoutbutton/logoutbutton.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminStudentsPageRoutingModule
  ],
  declarations: [
    AdminStudentsPage,
    LogoutbuttonComponent,
    SidebarComponent,
    StudentsListComponent,
  ]
})
export class AdminStudentsPageModule {}
