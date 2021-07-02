import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApirequestService } from 'src/app/services/apirequest.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-stats',
  templateUrl: './order-stats.component.html',
  styleUrls: ['./order-stats.component.css'],
})
export class OrderStatsComponent implements OnInit {
  view: [number, number] = [460, 180];
  ordersByStatusData: any[] = [];
  ordersByPaymentData: any[] = [];
  ordersByCountryData: any[] = [];
  colorScheme = {
    domain: ['#007cbb', '#61c673', '#ff8e28', '#ef2e2e'],
  };
  barColorScheme = {
    domain: ['#007cbb'],
  };

  constructor(private http: HttpClient, private orderService: OrderService) {}

  ngOnInit(): void {
    this.view = [460, 180];
    this.getOrder();
    // this.apiRequest.getBaseApi();
  }

  // getTokenStored() {
  //   let responseData: any = localStorage.getItem('currentUser');
  //   if (responseData != null) {
  //     let responseDataParsed: any = JSON.parse(responseData);

  //     return responseDataParsed.token;
  //   }
  //   return null;
  // }
  // getHeaders(): HttpHeaders {
  //   let headers = new HttpHeaders();
  //   let token = this.getTokenStored();

  //   headers = headers.append('Content-Type', 'application/json');
  //   if (token !== null) {
  //     headers = headers.append('Authorization', token);
  //   }
  //   console.log(headers);
  //   return headers;
  // }

  getOrder() {
    // this.orderService.getOrderStats('country').subscribe((res: any) => {
    //   console.log(res.items);
    //   this.ordersByCountryData = res.items;
    // });
    // this.orderService.getOrderStats('paytype').subscribe((res: any) => {
    //   console.log(res.items);
    //   this.ordersByPaymentData = res.items;
    // });
    // this.orderService.getOrderStats('status').subscribe((res: any) => {
    //   console.log(res.items);
    //   this.ordersByStatusData = res.items;
    // });
    var me = this;
    me.orderService
      .getOrderStats('status')
      .mergeMap(function (statusData) {
        me.ordersByStatusData = statusData.items;
        console.log('Received Orders By Status');
        return me.orderService.getOrderStats('paytype');
      })
      .mergeMap(function (payTypeData) {
        me.ordersByPaymentData = payTypeData.items;
        console.log('Received Orders By Payment Type');
        return me.orderService.getOrderStats('country');
      })
      .subscribe(function (countryData) {
        me.ordersByCountryData = countryData.items;
        console.log('Received Orders By Country');
      });
  }
}
