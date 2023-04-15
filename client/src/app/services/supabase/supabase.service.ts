import { Injectable } from '@angular/core';
import {
  SupabaseClient,
  createClient,
  AuthSession,
  Session,
} from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private _supabase: SupabaseClient;
  private _session$ = new BehaviorSubject<AuthSession | null>(null);

  constructor() {
    this._supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  setSession(session: Session | null) {
    this._session$.next(session);
  }

  async refreshSession() {
    const { data } = await this._supabase.auth.getSession();
    this._session$.next(data.session);
  }

  getSession() {
    return this._supabase.auth.getSession();
  }

  get session$() {
    return this._session$.asObservable();
  }

  signIn(email: string, password: string) {
    return this._supabase.auth.signInWithPassword({
      email,
      password,
    });
  }

  singUp(email: string, password: string, nick: string) {
    return this._supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nick,
        },
      },
    });
  }

  signOut() {
    return this._supabase.auth.signOut();
  }
}
