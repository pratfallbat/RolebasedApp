import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-stats',
  templateUrl: './order-stats.component.html',
  styleUrls: ['./order-stats.component.css'],
})
export class OrderStatsComponent implements OnInit {
  view: any[] = [460, 180];
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
    this.getOrder();
  }

  getTokenStored() {
    let responseData: any = localStorage.getItem('currentUser');
    if (responseData != null) {
      let responseDataParsed: any = JSON.parse(responseData);

      return responseDataParsed.token;
    }
    return null;
  }
  getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    let token = this.getTokenStored();

    headers = headers.append('Content-Type', 'application/json');
    if (token !== null) {
      headers = headers.append('Authorization', token);
    }
    console.log(headers);
    return headers;
  }

  getOrder() {
    this.http
      .get('http://localhost:9119/api/order-stats/country', {
        headers: this.getHeaders(),
      })
      .subscribe(
        (res: any) => {
          console.log(res.items);
          this.ordersByCountryData = res.items;
        }

        // (err) => console.log(err)
      );
  }
}
