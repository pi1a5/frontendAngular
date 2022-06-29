/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { AcompanhamentoPage } from './acompanhamento.page';

describe('AcompanhamentoPage', () => {
  let component: AcompanhamentoPage;
  let fixture: ComponentFixture<AcompanhamentoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AcompanhamentoPage],
      imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AcompanhamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
