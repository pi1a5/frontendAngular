/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { SelectCoursePage } from './select-course.page';

describe('SelectCoursePage', () => {
  let component: SelectCoursePage;
  let fixture: ComponentFixture<SelectCoursePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SelectCoursePage],
      imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectCoursePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
