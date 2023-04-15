import { TestBed } from '@angular/core/testing';

import { ContextMenuModalService } from './context-menu-modal.service';

describe('SupabaseService', () => {
  let service: ContextMenuModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContextMenuModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
