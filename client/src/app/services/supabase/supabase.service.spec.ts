import { SupabaseService } from './supabase.service';
import { take } from 'rxjs';
import { dummySession, dummyAuthResponse } from 'src/app/mock/session.mock';

describe('SupabaseService', () => {
  let service: SupabaseService;

  beforeEach(() => {
    service = new SupabaseService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set session correctly', () => {
    service.setSession(dummySession);
    service.session$.subscribe(session => {
      expect(session).toEqual(dummySession);
    });
  });

  it('should refresh session correctly', async () => {
    spyOn<any>(service, 'getSession').and.returnValue(
      Promise.resolve({ data: { session: dummySession } })
    );
    await service.refreshSession();

    service.session$.pipe(take(1)).subscribe(session => {
      expect(session).toEqual(dummySession);
    });
  });

  it('should return the correct session', async () => {
    spyOn<any>(service, 'getSession').and.returnValue(
      Promise.resolve({ data: { session: dummySession } })
    );
    const session = await service.getSession();
    expect(session.data.session).toEqual(dummySession);
  });

  it('should sign in successfully', async () => {
    const email = 'test@example.com';
    const password = 'testpassword';

    spyOn<SupabaseService, any>(service, 'signIn').and.returnValue(
      Promise.resolve({ data: dummyAuthResponse })
    );
    const authResponse = await service.signIn(email, password);
    expect(authResponse.data).toEqual(dummyAuthResponse);
  });

  it('should sign up successfully', async () => {
    const email = 'test@example.com';
    const password = 'testpassword';
    const nick = 'Test Nickname';

    spyOn<any>(service, 'signUp').and.returnValue(
      Promise.resolve({ data: dummyAuthResponse })
    );
    const authResponse = await service.signUp(email, password, nick);
    expect(authResponse.data).toEqual(dummyAuthResponse);
  });

  it('should sign out successfully', async () => {
    spyOn<any>(service, 'signOut').and.returnValue(Promise.resolve());
    await service.signOut();
    service.session$.pipe(take(1)).subscribe(session => {
      expect(session).toBeNull();
    });
  });
});
