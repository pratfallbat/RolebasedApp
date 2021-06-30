import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { User } from '../model/User';
import { UserServiceService } from '../services/user-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  currentUser: User;
  constructor(private router: Router, private userService: UserServiceService) {
    debugger;
    this.userService.currentUser.subscribe((data) => {
      this.currentUser = data;
    });
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    debugger;
    if (this.currentUser) {
      // if (
      //   route.data.roles &&
      //   route.data.roles.indexOf(this.currentUser.role) === -1
      // ) {
      //   this.router.navigate(['/401']);
      //   return false;
      // }
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
