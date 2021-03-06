import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerserviceService } from 'src/app/services/customer/customerservice.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  columns: any[];
  rows: any[];
  pageSize: number = 10;
  currentPage: number = 0;
  isLastPageLoaded: boolean = false;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private customerService: CustomerserviceService
  ) {}

  ngOnInit() {
    let me = this;
    me.getPageData();

    this.columns = [
      { prop: 'id', name: 'ID', width: 50 },
      { prop: 'firstName', name: 'First Name', width: 120 },
      { prop: 'lastName', name: 'Last Name', width: 120 },
      { prop: 'company', name: 'Company', width: 120 },
      { prop: 'email', name: 'Email', width: 200 },
      { prop: 'phone', name: 'Phone', width: 160 },
      { prop: 'address', name: 'Address', width: 220 },
    ];
  }

  getPageData(isAppend: boolean = false) {
    if (this.isLastPageLoaded === false) {
      let me = this;
      me.isLoading = true;
      this.customerService
        .getCustomers(this.currentPage, this.pageSize)
        .subscribe((data) => {
          console.log(data);
          me.isLastPageLoaded = data.last;
          me.currentPage = data.currentPageNumber + 1;
          if (isAppend === true) {
            me.rows = me.rows.concat(data.items);
          } else {
            me.rows = data.items;
          }
          me.isLoading = false;
        });
    }
  }

  onScroll() {
    console.log('bottom');
    if (this.isLoading === false) {
      this.getPageData(true);
    }
  }
}
