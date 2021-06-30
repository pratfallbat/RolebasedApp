import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Role } from 'src/app/model/Role';
import { User } from 'src/app/model/User';
import { UserServiceService } from 'src/app/services/user-service.service';
import { filter, map, mergeMap, switchMap } from 'rxjs/operators';

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

    router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((_) => this.router.routerState.root),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        mergeMap((route) => route.data)
      )
      .subscribe((data) => {
        console.log('Route data===: ', data);
        this.selectedHeaderItemIndex = data ? data.selectedHeaderItemIndex : -1;
        this.selectedSubNavItemIndex = data[0]
          ? data.selectedSubNavItemIndex
          : -1;
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
