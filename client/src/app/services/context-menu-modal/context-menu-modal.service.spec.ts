import { TestBed } from '@angular/core/testing';

import { ContextMenuModalService } from './context-menu-modal.service';
import { FormType } from 'src/app/models/types';
import { take } from 'rxjs';

describe('ContextMenuModalService', () => {
  let service: ContextMenuModalService;

  beforeEach(() => {
    service = new ContextMenuModalService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show and hide context menu', () => {
    const type: FormType = 'project';
    const id = '1';

    service.onShow(type, id);

    service.show$.pipe(take(1)).subscribe(data => {
      expect(data).toBeTrue();
    });

    expect(service.type).toBe('project');
    expect(service.id).toBe('1');

    service.onHide();

    service.show$.pipe(take(1)).subscribe(data => {
      expect(data).toBeFalse();
    });
  });
});
