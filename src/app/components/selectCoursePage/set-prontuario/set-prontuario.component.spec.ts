/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavParams } from '@ionic/angular';

import { SetProntuarioComponent } from './set-prontuario.component';

describe('SetProntuarioComponent', () => {
  let component: SetProntuarioComponent;
  let fixture: ComponentFixture<SetProntuarioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SetProntuarioComponent],
      imports: [IonicModule.forRoot()],
      providers: [NavParams]
    }).compileComponents();

    fixture = TestBed.createComponent(SetProntuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
