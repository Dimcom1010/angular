import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { AboutComponent } from './components/main/pages/about/about.component';
import { ContactsComponent } from './components/main/pages/contacts/contacts.component';
import { PortfolioComponent } from './components/main/pages/portfolio/portfolio.component';
import { AppRouterModule } from './Router.module';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRouterModule,BrowserModule,FooterComponent, HeaderComponent, MainComponent,AboutComponent,ContactsComponent,PortfolioComponent],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
