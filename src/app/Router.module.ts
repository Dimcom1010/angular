import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { AboutComponent } from './components/main/pages/about/about.component';
import { ContactsComponent } from './components/main/pages/contacts/contacts.component';
import { PortfolioComponent } from './components/main/pages/portfolio/portfolio.component';

const appRoutes: Routes = [
  { path: "", component: AboutComponent },
  { path: "contacts", component: ContactsComponent },
  { path: "portfolio", component: PortfolioComponent },
  { path: "**", redirectTo: '/' }
];
@NgModule({

  imports: [RouterModule, RouterModule.forRoot(appRoutes)],
exports:[RouterModule]
  
})
export class AppRouterModule {}
