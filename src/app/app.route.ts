import { Route } from '@angular/router';

import { AuthGuard } from '@shared/guards';
import { RulesEnum } from '@shared/models';

export const routes: Route[] = [
  {
    path: 'login',
    loadComponent: () => import('./components/main/pages/login/login.component').then((c) => c.LoginComponent),
    // loadChildren: () => import('./pages/auth/auth.route').then((r) => r.AUTH_ROUTES),
    // canMatch: [AuthGuard(RulesEnum.GUEST)],
  },
  {
    path: 'registration',
    loadComponent: () => import('./components/main/pages/registration/registration.component').then((c) => c.RegistrationComponent),
    // loadChildren: () => import('./pages/auth/auth.route').then((r) => r.AUTH_ROUTES),
    // canMatch: [AuthGuard(RulesEnum.GUEST)],
  },
  {
    path: 'admin',
    loadComponent: () => import('./components/main/pages/admin/admin.component').then((c) => c.AdminComponent),
    // loadChildren: () => import('./pages/admin/admin.route').then((r) => r.ADMIN_ROUTES),
    // canMatch: [AuthGuard(RulesEnum.SUPER_ADMIN, RulesEnum.ADMIN)],
  },
  {
    path: 'portfolio',
    loadComponent: () => import('./components/main/pages/portfolio/portfolio.component').then((e) => e.PortfolioComponent),
    // loadChildren: () => import('./pages/home/home.route').then((r) => r.HOME_ROUTES),
    // canMatch: [AuthGuard(RulesEnum.AUTH)],
  },
  {
    path: 'collection',
    loadComponent: () => import('./components/main/pages/portfolio/components/collection/collection.component').then((e) => e.CollectionComponent),
    // loadChildren: () => import('./pages/home/home.route').then((r) => r.HOME_ROUTES),
    // canMatch: [AuthGuard(RulesEnum.AUTH)],
  },
  {
    path: 'contacts',
    loadComponent: () => import('./components/main/pages/contacts/contacts.component').then((e) => e.ContactsComponent),
    // loadChildren: () => import('./pages/home/home.route').then((r) => r.HOME_ROUTES),
    // canMatch: [AuthGuard(RulesEnum.AUTH)],
  },
  { path: '**', redirectTo: 'auth' },
];
