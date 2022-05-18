import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectCoursePageRoutingModule } from './select-course-routing.module';

import { SelectCoursePage } from './select-course.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectCoursePageRoutingModule
  ],
  declarations: [SelectCoursePage]
})
export class SelectCoursePageModule {}
