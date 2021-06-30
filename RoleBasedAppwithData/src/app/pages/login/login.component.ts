import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { UserServiceService } from 'src/app/services/user-service.service';

export interface UserModelforLogin {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = new User();

  userModel: UserModelforLogin;

  errorMessage: string;

  constructor(
    private userService: UserServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userModel = { username: '', password: '' };
  }
  login() {
    this.userService.login(this.userModel).subscribe(
      (data) => {
        this.router.navigate(['/home']);
      },
      (err) => {
        this.errorMessage = 'Username or password is incorrect';
      }
    );
  }
  loginNew() {
    this.userService.login(this.user).subscribe(
      (data) => {
        this.router.navigate(['/home']);
      },
      (err) => {
        this.errorMessage = 'Username or password is incorrect';
      }
    );
  }
}
