import { Injectable } from '@angular/core';
import {
  SupabaseClient,
  createClient,
  AuthSession,
  AuthChangeEvent,
  Session,
} from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  session: AuthSession | null = null;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  // get getSession() {
  //   this.supabase.auth
  //     .getSession()
  //     .then(({ data }) => (this.session = data.session));
  //   return this.session;
  // }

  authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  getSession() {
    return this.supabase.auth.getSession();
  }

  async refresh() {
    const { data, error } = await this.supabase.auth.getSession();
    this.session = data.session;
  }

  signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({
      email,
      password,
    });
  }

  singUp(email: string, password: string) {
    return this.supabase.auth.signUp({
      email,
      password,
    });
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
  }
}
