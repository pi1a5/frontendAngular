import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TicketsWithoutSupervisorComponent } from './tickets-without-supervisor.component';

describe('TicketsWithoutSupervisorComponent', () => {
  let component: TicketsWithoutSupervisorComponent;
  let fixture: ComponentFixture<TicketsWithoutSupervisorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsWithoutSupervisorComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TicketsWithoutSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
