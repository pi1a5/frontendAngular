/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-return-assign */
/* eslint-disable import/prefer-default-export */
import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit {
  @Input() newCourse: boolean = false;

  @Input() courses: any[] = [];

  @Output() selectCourse = new EventEmitter<Object>();

  public loaded: boolean = false;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.courses.length > 0) return this.loaded = true;
  }

  sendCourse(course: any) {
    this.selectCourse.emit(course);
  }
}
