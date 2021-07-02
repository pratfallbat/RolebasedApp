import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AppConfig } from './app-config';

@Injectable({
  providedIn: 'root',
})
export class ApirequestService {
  constructor(
    private appConfig: AppConfig,
    private http: HttpClient,
    private router: Router
  ) {}
  getBaseApi() {
    let a = this.appConfig.getBasePi();
    console.log(a);
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
    debugger;
    let headers = new HttpHeaders();
    let token = this.getTokenStored();

    headers = headers.append('Content-Type', 'application/json');
    if (token !== null) {
      headers = headers.append('Authorization', token);
    }
    console.log(headers);
    return headers;
  }

  get(url: string, urlParams?: HttpParams): Observable<any> {
    let me = this;
    return this.http
      .get(this.appConfig.baseApiPath + url, {
        headers: this.getHeaders(),
        params: urlParams,
      })
      .catch(function (error: any) {
        console.log('Some error in catch');
        if (error.status === 401 || error.status === 403) {
          me.router.navigate(['/logout']);
        }
        return Observable.throw(error || 'Server error');
      });
  }
  post(url: string, body: Object): Observable<any> {
    let me = this;
    return this.http
      .post(this.appConfig.baseApiPath + url, JSON.stringify(body), {
        headers: this.getHeaders(),
      })
      .catch(function (error: any) {
        if (error.status === 401) {
          me.router.navigate(['/logout']);
        }
        return Observable.throw(error || 'Server error');
      });
  }

  put(url: string, body: Object): Observable<any> {
    let me = this;
    return this.http
      .put(this.appConfig.baseApiPath + url, JSON.stringify(body), {
        headers: this.getHeaders(),
      })
      .catch(function (error: any) {
        if (error.status === 401) {
          me.router.navigate(['/logout']);
        }
        return Observable.throw(error || 'Server error');
      });
  }

  delete(url: string): Observable<any> {
    let me = this;
    return this.http
      .delete(this.appConfig.baseApiPath + url, { headers: this.getHeaders() })
      .catch(function (error: any) {
        if (error.status === 401) {
          me.router.navigate(['/logout']);
        }
        return Observable.throw(error || 'Server error');
      });
  }
}
