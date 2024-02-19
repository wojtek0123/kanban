import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase/supabase.service';

export const AuthGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const supabase = inject(SupabaseService);

  return await supabase
    .getSession()
    .then(res => !!res.data.session || router.createUrlTree(['/auth']));
};
