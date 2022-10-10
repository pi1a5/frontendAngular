import { TestBed } from '@angular/core/testing';

import { ApiAdminService } from './api-admin.service';

describe('ApiAdminService', () => {
  let service: ApiAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
