import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth-guard';
import { Role } from './model/Role';
import { AdminhomeComponent } from './pages/adminhome/adminhome.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { DashBoardComponent } from './pages/dash-board/dash-board.component';
import { DetailComponent } from './pages/detail/detail.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { OrderStatsComponent } from './pages/order-stats/order-stats.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductStatsComponent } from './pages/product-stats/product-stats.component';
import { ProductsComponent } from './pages/products/products.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NotfoundComponent } from './services/notfound/notfound.component';
import { UnauthorizedComponent } from './services/unauthorized/unauthorized.component';

const routes: Routes = [
  { path: '', redirectTo: 'home/dashboard/order', pathMatch: 'full' },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.USER, Role.ADMIN] },
    children: [
      {
        path: '',
        redirectTo: '/home/dashboard/order',
        pathMatch: 'full',
        data: { selectedHeaderItemIndex: 1, selectedSubNavItemIndex: -1 },
      },
      {
        path: 'dashboard',
        component: DashBoardComponent,
        data: { selectedHeaderItemIndex: 0, selectedSubNavItemIndex: -1 },
        children: [
          {
            path: '',
            redirectTo: '/home/dashboard/order',
            pathMatch: 'full',
          },
          {
            path: 'order',
            component: OrderStatsComponent,
            data: { selectedHeaderItemIndex: 0, selectedSubNavItemIndex: 0 },
          },
          {
            path: 'product',
            component: ProductStatsComponent,
            data: { selectedHeaderItemIndex: 0, selectedSubNavItemIndex: 1 },
          },
        ],
      },
      {
        path: 'orders',
        component: OrdersComponent,
        data: { selectedHeaderItemIndex: 1, selectedSubNavItemIndex: -1 },
      },
      {
        path: 'orders/:id',
        component: OrderDetailComponent,
        data: [{ selectedHeaderItemIndex: 1, selectedSubNavItemIndex: -1 }],
      },
      {
        path: 'products',
        component: ProductsComponent,
        data: { selectedHeaderItemIndex: 1, selectedSubNavItemIndex: -1 },
      },
      {
        path: 'customers',
        component: CustomerComponent,
        data: { selectedHeaderItemIndex: 1, selectedSubNavItemIndex: -1 },
      },
      {
        path: 'employees',
        component: EmployeesComponent,
        data: { selectedHeaderItemIndex: 1, selectedSubNavItemIndex: -1 },
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { selectedHeaderItemIndex: -1, selectedSubNavItemIndex: -1 },
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { selectedHeaderItemIndex: -1, selectedSubNavItemIndex: -1 },
  },
  {
    path: 'order-detail',
    component: AdminhomeComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.ADMIN],
      selectedHeaderItemIndex: -1,
      selectedSubNavItemIndex: -1,
    },
  },

  {
    path: 'admin',
    component: AdminhomeComponent,
    canActivate: [AuthGuard],
    data: {
      // roles: [Role.ADMIN],
      selectedHeaderItemIndex: -1,
      selectedSubNavItemIndex: -1,
    },
  },
  {
    path: 'detail/:id',
    component: DetailComponent,
    canActivate: [AuthGuard],
    data: {
      // roles: [Role.ADMIN],
      selectedHeaderItemIndex: -1,
      selectedSubNavItemIndex: -1,
    },
  },
  {
    path: '**',
    component: NotfoundComponent,
    data: [{ selectedHeaderItemIndex: -1, selectedSubNavItemIndex: -1 }],
  },
  // {
  //   path: '404',
  //   component: NotfoundComponent,
  //   data: { selectedHeaderItemIndex: -1, selectedSubNavItemIndex: -1 },
  // },
  // {
  //   path: '401',
  //   component: UnauthorizedComponent,
  //   data: { selectedHeaderItemIndex: -1, selectedSubNavItemIndex: -1 },
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(private router: Router) {
    this.router.errorHandler = (error: any) => {
      console.log(error);
      this.router.navigate(['/404']);
    };
  }
}
