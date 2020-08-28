import { Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})

export class NavAuthGuardService {

  constructor (private _router: Router) { }
  async canActivate() {
      if (!window.localStorage.getItem("authuitoken")) {
        // need to re-write this code
        // currently, this code will provide admin access to anyone who knows the password
        // a better approach is to create a passwordless admin login
        // change this to an observable and verify all admin auth HTTP request against user's setting/account
        // also update VMS_CONFIG Firebase rules to prevent hacking and create passwordless admin panel access
        this._router.navigate(['/login']);
      }
      return true;
    }
  }
