import { Injectable } from '@angular/core';
import {
  SupabaseClient,
  createClient,
  AuthSession,
  Session,
} from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private session: AuthSession | null = null;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  setSession(session: Session | null) {
    this.session = session;
  }

  async refreshSession() {
    const { data } = await this.supabase.auth.getSession();
    this.session = data.session;
  }

  get getUserId() {
    return this.session?.user.id ?? '';
  }

  getSession() {
    return this.supabase.auth.getSession();
  }

  signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({
      email,
      password,
    });
  }

  singUp(email: string, password: string, nick: string) {
    return this.supabase.auth.signUp({
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
    return this.supabase.auth.signOut();
  }
}
