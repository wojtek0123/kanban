import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase/supabase.service';

export const AuthGuard = async () => {
  const router = inject(Router);
  const supabase = inject(SupabaseService);

  const { data } = await supabase.getSession();

  return !data.session ? router.navigate(['/home']) : true;
};
