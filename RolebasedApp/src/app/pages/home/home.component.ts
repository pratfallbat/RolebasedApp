import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/model/Role';
import { User } from 'src/app/model/User';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public showAppAlert: boolean = false;
  public appHeaderItems = [
    {
      label: 'Dashboard',
      href: '/home/dashboard',
      subNav: [
        { label: 'Order Stats', href: '/home/dashboard/order' },
        { label: 'Product Stats', href: '/home/dashboard/product' },
      ],
    },
    { label: 'Orders', href: '/home/orders', subNav: [] },
    { label: 'Products', href: '/home/products', subNav: [] },
    { label: 'Customers', href: '/home/customers', subNav: [] },
    { label: 'Employees', href: '/home/employees', subNav: [] },
  ];
  public selectedHeaderItemIndex: number = 0;
  public selectedSubNavItemIndex: number = 1;
  public userName: string = '';

  constructor(private userService: UserServiceService, private router: Router) {
    this.userService.currentUser.subscribe((data) => {
      this.currentUser = data;
    });
  }

  ngOnInit(): void {}

  title = 'RolebasedApp';
  currentUser: User;

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
