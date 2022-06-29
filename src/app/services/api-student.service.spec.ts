/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiStudentService } from './api-student.service';

describe('ApiStudentService', () => {
  let service: ApiStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
