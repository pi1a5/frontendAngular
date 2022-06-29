/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { ChartSupervisorsPage } from './chart-supervisors.page';

describe('ChartSupervisorsPage', () => {
  let component: ChartSupervisorsPage;
  let fixture: ComponentFixture<ChartSupervisorsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ChartSupervisorsPage],
      imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartSupervisorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
