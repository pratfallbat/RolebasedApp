import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminhomeComponent } from './pages/adminhome/adminhome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UnauthorizedComponent } from './services/unauthorized/unauthorized.component';
import { NotfoundComponent } from './services/notfound/notfound.component';
import { DetailComponent } from './pages/detail/detail.component';
import { DashBoardComponent } from './pages/dash-board/dash-board.component';
import { OrderStatsComponent } from './pages/order-stats/order-stats.component';
import { ProductStatsComponent } from './pages/product-stats/product-stats.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductsComponent } from './pages/products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    AdminhomeComponent,
    UnauthorizedComponent,
    NotfoundComponent,
    DetailComponent,
    DashBoardComponent,
    OrderStatsComponent,
    ProductStatsComponent,
    OrdersComponent,
    ProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
