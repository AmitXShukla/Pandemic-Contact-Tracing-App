import { NgModule } from '@angular/core';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

import { Routes, RouterModule } from '@angular/router';
import  { AuthGuardService } from './services/authguard.service';
import  { NavAuthGuardService } from './services/navauthguard.service';

import { LoginComponent } from './ui/auth/login.component';
import { SettingsComponent } from './ui/auth/settings.component';
import { SignupComponent } from './ui/auth/signup.component';
// admin pages
import { ConfigComponent } from './ui/admin/config.component';
import { ReportsComponent } from './ui/admin/reports.component';
import { EvacuateComponent } from './ui/admin/evacuate.component';
// static pages
import { AboutusComponent } from './ui/static/aboutus.component';

import { CheckoutComponent } from './ui/register/checkout.component';
import { CheckinComponent } from './ui/register/checkin.component';
import { RegisterComponent } from './ui/register/register.component';
import { BadgeComponent } from './ui/register/badge.component';
import { TermsComponent } from './ui/register/terms.component';
import { PictureComponent } from './ui/register/picture.component';
import { GuestComponent } from './ui/guest/guest.component';
import { HostComponent } from './ui/host/host.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  // { path: 'config', component: ConfigComponent, canActivate: [AngularFireAuthGuard, AuthGuardService, NavAuthGuardService] },
  { path: 'config', component: ConfigComponent, canActivate: [AngularFireAuthGuard, AuthGuardService, NavAuthGuardService ] },
  { path: 'reports', component: ReportsComponent, canActivate: [AngularFireAuthGuard, AuthGuardService, NavAuthGuardService ] },
  { path: 'evacuate', component: EvacuateComponent, canActivate: [AngularFireAuthGuard, AuthGuardService, NavAuthGuardService ] },
  // { path: 'settings', component: SettingsComponent, canActivate: [AngularFireAuthGuard, AuthGuardService] },
  { path: 'settings', component: SettingsComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'checkin/:id', component: CheckinComponent, canActivate: [AngularFireAuthGuard, AuthGuardService] },
  { path: 'checkout/:id', component: CheckoutComponent, canActivate: [AngularFireAuthGuard, AuthGuardService] },
  { path: 'terms/:id', component: TermsComponent, canActivate: [AngularFireAuthGuard, AuthGuardService] },
  { path: 'picture/:id', component: PictureComponent, canActivate: [AngularFireAuthGuard, AuthGuardService] },
  { path: 'badge/:id', component: BadgeComponent, canActivate: [AngularFireAuthGuard, AuthGuardService] },
  { path: 'register', component: RegisterComponent, canActivate: [AngularFireAuthGuard, AuthGuardService] },
  { path: 'guest', component: GuestComponent, canActivate: [AngularFireAuthGuard, AuthGuardService, NavAuthGuardService] },
  { path: 'host', component: HostComponent, canActivate: [AngularFireAuthGuard, AuthGuardService, NavAuthGuardService] },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
