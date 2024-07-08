import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '@environments/environments';
import { AuthService } from '@routes/auth/services/auth.service';
import { LocalStorageService } from '@storage/LocalStorage.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const LocalStorage = inject(LocalStorageService);
  const router = inject(Router);
  let token = LocalStorage.getItem(environment.TOKEN);
  if (!token || authService.checkToken(token as string).subscribe()) {
    router.navigate(['/home']);
    return false;
  };
  return true;
};
