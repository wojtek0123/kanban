import { take } from 'rxjs/operators';
import { NavigationService } from './navigation.service';

describe('NavigationService', () => {
  let service: NavigationService;

  beforeEach(() => {
    service = new NavigationService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show and hide menu', () => {
    service.onMenu();
    service.showMenu$.pipe(take(1)).subscribe(data => expect(data).toBeTrue());
    service.onMenu();
    service.showMenu$.pipe(take(1)).subscribe(data => expect(data).toBeFalse());
  });
});
