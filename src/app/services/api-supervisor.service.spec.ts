import { TestBed } from '@angular/core/testing';

import { ApiSupervisorService } from './api-supervisor.service';

describe('ApiSupervisorService', () => {
  let service: ApiSupervisorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSupervisorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
