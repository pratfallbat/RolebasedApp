import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  user: User = new User();
  errorMessage: string;

  constructor(
    private userService: UserServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.userService.currentUserValue) {
      this.router.navigate(['/profile']);
      return;
    }
  }

  register() {
    this.userService.register(this.user).subscribe(
      (data) => {
        this.router.navigate(['/login']);
      },
      (err) => {
        this.errorMessage = 'Username is already exist.';
      }
    );
  }
}
