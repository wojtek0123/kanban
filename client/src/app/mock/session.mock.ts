import { Session } from '@supabase/supabase-js';

export const dummySession: Session = {
  provider_token: 'some_provider_token',
  provider_refresh_token: 'some_provider_refresh_token',
  access_token: 'some_access_token',
  refresh_token: 'some_refresh_token',
  expires_in: 3600,
  expires_at: 1651598642,
  token_type: 'Bearer',
  user: {
    aud: '123',
    id: '123',
    email: 'john@example.com',
    role: 'user',
    confirmed_at: '2023-05-03T12:34:56.000Z',
    created_at: '2023-05-01T12:34:56.000Z',
    updated_at: '2023-05-03T12:34:56.000Z',
    app_metadata: {},
    user_metadata: {},
  },
};

export const dummyAuthResponse = {
  user: dummySession.user,
  session: dummySession,
};
