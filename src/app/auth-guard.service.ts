import { Injectable } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { CanActivate } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authServices: NbAuthService) { }

  canActivate() {
    return this.authServices.isAuthenticated()
  }
}
