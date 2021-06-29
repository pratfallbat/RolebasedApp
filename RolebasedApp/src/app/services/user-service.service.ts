import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from '../model/User';
import { map, catchError } from 'rxjs/operators';
let API_URL = 'http://localhost:8080/api/user/';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    debugger;
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  login(user: User): Observable<any> {
    debugger;
    const headers = new HttpHeaders(
      user
        ? {
            authorization: 'Basic ' + btoa(user.username + ':' + user.password),
          }
        : {}
    );
    return this.http
      .get<any>('http://localhost:8080/api/user/' + 'login', {
        headers: headers,
      })
      .pipe(
        map((response) => {
          if (response) {
            debugger;
            localStorage.setItem('currentUser', JSON.stringify(response));
            this.currentUserSubject.next(response);
            console.log(this.currentUserSubject);
            console.log('---------------');

            console.log(this.currentUser);
          }
          return response;
        })
      );
  }

  logOut(): Observable<any> {
    debugger;
    return this.http.post(API_URL + 'logout', {}).pipe(
      map((response) => {
        debugger;
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
      })
    );
  }
  register(user: User): Observable<any> {
    return this.http.post(
      'http://localhost:8080/api/user/' + 'registration',
      JSON.stringify(user),
      {
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      }
    );
  }
}
