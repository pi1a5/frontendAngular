/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiSupervisorService } from './api-supervisor.service';

describe('ApiSupervisorService', () => {
  let service: ApiSupervisorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiSupervisorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
