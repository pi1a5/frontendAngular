/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

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
  ],
})
export class SelectCoursePageModule {}
