import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/User';
import { AdminService } from 'src/app/services/admin.service';
let API_URL = 'http://localhost:8080/api/admin/';
@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css'],
})
export class AdminhomeComponent implements OnInit {
  userList: Array<User>;

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.findAllUsers();
  }

  findAllUsers() {
    this.adminService.findAllUsers().subscribe((data) => {
      this.userList = data;
    });
  }

  detail(user: User) {
    localStorage.setItem('detailUser', JSON.stringify(user));
    this.router.navigate(['/detail', user.id]);
  }
}
