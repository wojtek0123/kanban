import { fakeAsync, tick } from '@angular/core/testing';
import { ToastService } from './toast.service';
import { ToastType } from 'src/app/models/types';
import { take } from 'rxjs';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    service = new ToastService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show and close confirm toast', fakeAsync(() => {
    const message = 'Test message';
    const type: ToastType = 'confirm';

    service.showToast(type, message);

    service.show$.pipe(take(1)).subscribe(state => {
      expect(state).toBeTrue();
    });

    tick(3000);

    service.show$.pipe(take(1)).subscribe(state => {
      expect(state).toBeFalse();
    });

    service.toast$.subscribe(toast => {
      expect(toast.message).toEqual('Test message');
      expect(toast.type).toEqual('confirm');
    });
  }));

  it('should close a toast before 3000ms', async () => {
    const message = 'test message';
    const type: ToastType = 'confirm';

    service.showToast(type, message);
    service.show$.pipe(take(1)).subscribe(state => {
      expect(state).toBeTrue();
    });

    service.closeToast();

    service.show$.pipe(take(1)).subscribe(state => {
      expect(state).toBeFalse();
    });
  });

  it('should show and close a warning toast', fakeAsync(() => {
    const message = 'Something went wrong';
    const type: ToastType = 'warning';

    service.showToast(type, message);

    service.show$.pipe(take(1)).subscribe(state => {
      expect(state).toBeTrue();
    });

    service.toast$.subscribe(state => {
      expect(state.type).toBe('warning');
      expect(state.message).toMatch(/something went wrong/i);
    });

    tick(3000);

    service.show$.pipe(take(1)).subscribe(state => {
      expect(state).toBeFalse();
    });
  }));
});
