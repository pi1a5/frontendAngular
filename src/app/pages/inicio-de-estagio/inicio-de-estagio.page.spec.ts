/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InicioDeEstagioPage } from './inicio-de-estagio.page';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InicioDeEstagioPage', () => {
  let component: InicioDeEstagioPage;
  let fixture: ComponentFixture<InicioDeEstagioPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InicioDeEstagioPage],
      imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InicioDeEstagioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
