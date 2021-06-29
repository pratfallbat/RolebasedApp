import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth-guard';
import { Role } from './model/Role';
import { AdminhomeComponent } from './pages/adminhome/adminhome.component';
import { DashBoardComponent } from './pages/dash-board/dash-board.component';
import { DetailComponent } from './pages/detail/detail.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { OrderStatsComponent } from './pages/order-stats/order-stats.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductStatsComponent } from './pages/product-stats/product-stats.component';
import { ProductsComponent } from './pages/products/products.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NotfoundComponent } from './services/notfound/notfound.component';
import { UnauthorizedComponent } from './services/unauthorized/unauthorized.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.USER, Role.ADMIN] },
    children: [
      { path: '', redirectTo: '/home/dashboard/order', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashBoardComponent,
        children: [
          {
            path: '',
            redirectTo: '/home/dashboard/order',
            pathMatch: 'full',
          },
          { path: 'order', component: OrderStatsComponent },
          { path: 'product', component: ProductStatsComponent },
        ],
      },
      { path: 'orders', component: OrdersComponent },
      { path: 'products', component: ProductsComponent },
    ],
  },

  {
    path: 'admin',
    component: AdminhomeComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN] },
  },
  {
    path: 'detail/:id',
    component: DetailComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN] },
  },
  { path: '404', component: NotfoundComponent },
  { path: '401', component: UnauthorizedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(private router: Router) {
    this.router.errorHandler = (error: any) => {
      this.router.navigate(['/404']);
    };
  }
}
