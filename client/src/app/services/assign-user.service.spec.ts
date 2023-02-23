import { TestBed } from '@angular/core/testing';

import { AssignUserService } from './assign-user.service';

describe('AssignService', () => {
  let service: AssignUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
