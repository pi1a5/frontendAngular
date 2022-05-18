import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectCoursePage } from './select-course.page';

const routes: Routes = [
  {
    path: '',
    component: SelectCoursePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectCoursePageRoutingModule {}
