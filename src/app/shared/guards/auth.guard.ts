import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

import { RulesEnum } from '@shared/models';
import { AuthService } from '@shared/services';

export const AuthGuard =
  (...rules: RulesEnum[]): CanMatchFn =>
  () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (rules.includes(RulesEnum.AUTH) && !auth.isAuth) {
      return router.navigate(['login']);
    }

    if (rules.includes(RulesEnum.GUEST) && !auth.isAuth) {
      return true;
    }

    if (rules.includes(RulesEnum.GUEST) && auth.isAuth) {
      return router.navigate(['contacts']);
    }

    if (!rules.filter((e) => e !== RulesEnum.AUTH && e !== RulesEnum.GUEST)?.length) {
      return true;
    }

    const user = auth.user();

    const isSuperAdmin = rules.includes(RulesEnum.SUPER_ADMIN) && user?.rule.is_super_admin;
    const isAdmin = rules.includes(RulesEnum.ADMIN) && user?.rule.is_admin;
    const isPremium = rules.includes(RulesEnum.PREMIUN) && user?.rule.is_premium;

    if (!isSuperAdmin && !isAdmin && !isPremium) {
      return router.navigate(['contacts']);
    }

    return true;
  };
