import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SplashComponent } from './splash/splash.component';
import { ProfileComponent } from './profile/profile.component';
import { SantaponecontrolComponent } from './santaponecontrol/santaponecontrol.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { MatMenuModule } from '@angular/material/menu';
import { NavbarComponent } from './navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: 'profile', component: ProfileComponent },
  {
    path: 'splash',
    component: SplashComponent
  },
  { path: '',
    redirectTo: '/splash',
    pathMatch: 'full'
  }
];
@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    ProfileComponent,
    SantaponecontrolComponent,
    NotificationsComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
