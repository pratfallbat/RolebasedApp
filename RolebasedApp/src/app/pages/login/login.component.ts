import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = new User();
  errorMessage: string;

  constructor(
    private userService: UserServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  login() {
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
