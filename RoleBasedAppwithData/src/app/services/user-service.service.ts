import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from '../model/User';
import { map, catchError } from 'rxjs/operators';
import { UserModelforLogin } from '../pages/login/login.component';
import { Role } from '../model/Role';
import { ApirequestService } from './apirequest.service';
let API_URL = 'http://localhost:8080/api/user/';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient, private apiRequest: ApirequestService) {
    debugger;
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user: UserModelforLogin): Observable<any> {
    debugger;
    return (
      this.apiRequest
        // .post('http://localhost:9119/session', user, { headers: null })
        .post('session', user)
        .pipe(
          map((jsonResp: any) => {
            if (
              jsonResp !== undefined &&
              jsonResp !== null &&
              jsonResp.operationStatus === 'SUCCESS'
            ) {
              console.log(jsonResp);
              localStorage.setItem(
                'currentUser',
                JSON.stringify(jsonResp.item)
              );
              let uone: User = {
                username: jsonResp.item.userId,
                name: jsonResp.item.firstName,
                token: jsonResp.item.token,
                password: 'sdadas',
                id: 1,
                role: Role.USER,
              };

              this.currentUserSubject.next(uone);
              return uone;
            }
          })
        )
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
