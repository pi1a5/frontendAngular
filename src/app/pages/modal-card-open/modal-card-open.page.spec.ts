/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, NavParams } from '@ionic/angular';

import { ModalCardOpenPage } from './modal-card-open.page';

describe('ModalCardOpenPage', () => {
  let component: ModalCardOpenPage;
  let fixture: ComponentFixture<ModalCardOpenPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCardOpenPage],
      imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule],
      providers: [NavParams]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalCardOpenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
