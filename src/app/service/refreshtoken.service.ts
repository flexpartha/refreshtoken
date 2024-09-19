import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../userModel/user.interface';
import { Observable, Subject } from 'rxjs';
import { ResponseData, RootObject } from '../userModel/userResponse.interface';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': 'https://freeapi.gerasim.in',
});

@Injectable({
  providedIn: 'root',
})
export class RefreshtokenService {
  public $refreshToken = new Subject<boolean>();
  public $refreshTokenReceived = new Subject<boolean>();

  private http = inject(HttpClient);
  constructor() {
    this.$refreshToken.subscribe((res: any) => {
      this.getRefreshToken();
    });
  }

  onLogin(obj: RootObject): Observable<RootObject> {
    return this.http
      .post<RootObject>('https://freeapi.gerasim.in/api/JWT/login', obj, {
        headers: headers,
      })
      .pipe();
  }

  getAllUser(): Observable<any> {
    return this.http.get<any>(
      'https://freeapi.gerasim.in/api/JWT/GetAllUsers',
      { headers: headers }
    );
  }

  getRefreshToken() {
    let loggedUserData!: ResponseData;

    const storeData = localStorage.getItem('angular17data');
    if (storeData != null) {
      loggedUserData = JSON.parse(storeData);
    }
    const obj = {
      emailId: localStorage.getItem('angular17dataemail'),
      token: '',
      refreshToken: loggedUserData.refreshToken,
    };
    this.http
      .post<any>('https://freeapi.gerasim.in/api/JWT/refresh', obj, {
        headers: headers,
      })
      .subscribe((res: any) => {
        console.log(res);
        localStorage.setItem('angular17data', JSON.stringify(res.data));
        this.$refreshTokenReceived.next(true);
      });
  }
}
