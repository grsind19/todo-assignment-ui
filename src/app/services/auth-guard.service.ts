import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, 
    public router: Router,
    private toastr: ToastrService,) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.toastr.error("User is not logged in", 'Not authenticated!!!', {
        timeOut: 3000
      })
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}