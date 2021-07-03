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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductsComponent } from './pages/products/products.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ClarityModule } from '@clr/angular';
import { ApirequestService } from './services/apirequest.service';
import { AppConfig } from './services/app-config';
import { OrderService } from './services/order.service';
import { TranslateService } from './services/translate/translate.service';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { RouterModule } from '@angular/router';
import { LogoComponent } from './components/logo/logo.component';
import { BadgeComponent } from './components/badge/badge.component';
import { LegendComponent } from './components/legend/legend.component';

@NgModule({
  declarations: [
    BadgeComponent,
    LegendComponent,
    LogoComponent,

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
    EmployeesComponent,
    CustomerComponent,
    OrderDetailComponent,
  ],
  imports: [
    NgxDatatableModule,

    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxChartsModule,
    AppRoutingModule,

    ReactiveFormsModule,
    HttpClientModule,

    ClarityModule.forChild(),
  ],
  providers: [AppConfig],
  bootstrap: [AppComponent],
})
export class AppModule {}
