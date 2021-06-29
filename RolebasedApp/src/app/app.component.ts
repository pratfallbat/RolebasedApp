import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './model/Role';
import { User } from './model/User';
import { UserServiceService } from './services/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'RolebasedApp';
  currentUser: User;
  constructor(private userService: UserServiceService, private router: Router) {
    this.userService.currentUser.subscribe((data) => {
      this.currentUser = data;
    });
  }
  logOut() {
    debugger;
    this.userService.logOut().subscribe((data) => {
      this.router.navigate(['/login']);
    });
  }
  get isAdmin() {
    debugger;
    return this.currentUser && this.currentUser.role === Role.ADMIN;
  }
}
