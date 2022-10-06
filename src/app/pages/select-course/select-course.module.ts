/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogoutbuttonComponent } from 'src/app/components/logoutbutton/logoutbutton.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { SelectCoursePage } from './select-course.page';
import { SelectCoursePageRoutingModule } from './select-course-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectCoursePageRoutingModule,
  ],
  declarations: [
    SelectCoursePage,
    LogoutbuttonComponent,
    SidebarComponent,
  ],
})
export class SelectCoursePageModule {}
