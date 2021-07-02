import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApirequestService } from '../apirequest.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private apiRequest: ApirequestService) {}
  getEmployees(page?: number, size?: number): Observable<any> {
    //Create Request URL params
    let me = this;
    let params: HttpParams = new HttpParams();
    params = params.append(
      'page',
      typeof page === 'number' ? page.toString() : '0'
    );
    params = params.append(
      'size',
      typeof size === 'number' ? size.toString() : '1000'
    );
    return this.apiRequest.get('api/employees', params);
  }
}
