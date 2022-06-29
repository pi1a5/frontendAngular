/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';

import { FimDeEstagioPage } from './fim-de-estagio.page';

describe('FimDeEstagioPage', () => {
  let component: FimDeEstagioPage;
  let fixture: ComponentFixture<FimDeEstagioPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FimDeEstagioPage],
      imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FimDeEstagioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
