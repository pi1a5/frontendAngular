/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { SelectTicketTypePage } from './select-ticket-type.page';

describe('SelectTicketTypePage', () => {
  let component: SelectTicketTypePage;
  let fixture: ComponentFixture<SelectTicketTypePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SelectTicketTypePage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectTicketTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
