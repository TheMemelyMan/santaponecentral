import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { HeadquartersComponent } from './headquarters/headquarters.component';
import { CorrespondenceComponent } from './correspondence/correspondence.component';
import { AdminControlComponent } from './admin-control/admin-control.component';


//Auth imports
import { AuthGuard } from './auth/auth.guard'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './auth/interceptor.service';
import { MissionBoardsComponent } from './mission-boards/mission-boards.component';
import { AgentCatalogueComponent } from './agent-catalogue/agent-catalogue.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { environment } from 'src/environments/environment';
import { StatusCheckerComponent } from './status-checker/status-checker.component';


const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  { path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mission-boards',
    component: MissionBoardsComponent
  },
  {
    path: 'status-checker',
    component: StatusCheckerComponent
  },
  {
    path: 'signup',
    component: !environment.production ? SignupComponent : NotFoundComponent
  },
  {
    path: 'headquarters',
    component: HeadquartersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'correspondence',
    component: CorrespondenceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin-control',
    component: AdminControlComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'agent-catalogue',
    component: AgentCatalogueComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
		path: "**",
    redirectTo: "not-found",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ]
})
export class AppRoutingModule { }
