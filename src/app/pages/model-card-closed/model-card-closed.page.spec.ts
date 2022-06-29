/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, NavParams } from '@ionic/angular';

import { ModelCardClosedPage } from './model-card-closed.page';

describe('ModelCardClosedPage', () => {
  let component: ModelCardClosedPage;
  let fixture: ComponentFixture<ModelCardClosedPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ModelCardClosedPage],
      imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule],
      providers: [NavParams]
    }).compileComponents();

    fixture = TestBed.createComponent(ModelCardClosedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
