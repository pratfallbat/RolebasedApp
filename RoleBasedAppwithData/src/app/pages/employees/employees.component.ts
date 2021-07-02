import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  columns: any[];
  rows: any[];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    var me = this;
    me.getPageData();

    this.columns = [
      { prop: 'id', name: 'ID', width: 50 },
      { prop: 'firstName', name: 'First Name', width: 120 },
      { prop: 'lastName', name: 'Last Name', width: 120 },
      { prop: 'email', name: 'Email', width: 250 },
      { prop: 'phone', name: 'Phone', width: 160 },
      { prop: 'department', name: 'Department', width: 220 },
    ];
  }

  getPageData() {
    var me = this;
    this.employeeService.getEmployees().subscribe((data) => {
      this.rows = data.items;
    });
  }
}
