import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './components/main/pages/about/about.component';
import { ContactsComponent } from './components/main/pages/contacts/contacts.component';
import { PortfolioComponent } from './components/main/pages/portfolio/portfolio.component';
import { CollectionComponent } from './components/main/pages/portfolio/components/collection/collection.component';
import { AdminComponent } from './components/main/pages/admin/admin.component';
import { LoginComponent } from './components/main/pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegistrationComponent } from './components/main/pages/registration/registration.component';

const appRoutes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'collection', component: CollectionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  // { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent },

  { path: '**', redirectTo: '/' },
];
@NgModule({
  imports: [RouterModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRouterModule {}
