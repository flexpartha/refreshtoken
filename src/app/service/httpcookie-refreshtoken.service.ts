import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ResponseData, RootObject } from '../userModel/userResponse.interface';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': 'https://freeapi.gerasim.in',
  'Access-Control-Allow-Headers': '*',
});

@Injectable({
  providedIn: 'root',
})
export class HttpcookieRefreshtokenService {
  private http = inject(HttpClient);
  private authUrl = 'https://freeapi.gerasim.in/api/JWT/login';
  private refreshUrl = 'https://freeapi.gerasim.in/api/JWT/refresh';
  private allUsers = 'https://freeapi.gerasim.in/api/JWT/GetAllUsers';
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  private email: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  private readonly TOKEN_KEY = 'angular17data';
  private readonly EMAIL_ID = 'angular17dataemail';

  public $refreshToken = new Subject<boolean>();
  public $refreshTokenReceived = new Subject<boolean>();
  constructor(public cookieService: CookieService) {
    this.$refreshToken.subscribe((res: any) => {
      this.getRefreshToken();
    });
  }

  onLogin(obj: RootObject): Observable<RootObject> {
    return this.http
      .post<RootObject>(this.authUrl, obj, {
        headers: headers,
      })
      .pipe(
        tap((response) => {
          console.log('normal token ::--', response);
          this.setToken(response.data);
          this.setEmailId(response.data.emailId);
        })
      );
  }
  getAllUser(): Observable<any> {
    return this.http.get<any>(this.allUsers, { headers: headers });
  }
  getRefreshToken(): Observable<any> {
    let loggedUserData!: ResponseData;
    const storeData = this.getToken();
    if (storeData != null) {
      loggedUserData = JSON.parse(storeData);
    }
    const obj = {
      emailId: this.getemail(),
      token: '',
      refreshToken: loggedUserData.refreshToken,
    };
    return this.http
      .post<any>(this.refreshUrl, obj, {
        headers: headers,
      })
      .pipe(
        tap((response) => {
          console.log('refresh token ::--', response);
          this.setToken(response.data);
        })
      );
  }

  getToken(): any {
    //return this.cookieService.get(this.TOKEN_KEY);
    return localStorage.getItem(this.TOKEN_KEY);
  }
  setToken(token: any) {
    //this.cookieService.set(this.TOKEN_KEY, JSON.stringify(token));
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(token));
    this.tokenSubject.next(token);
  }

  setEmailId(emailid: string) {
    //this.cookieService.set(this.EMAIL_ID, emailid);
    localStorage.setItem(this.EMAIL_ID, emailid);
    this.email.next(emailid);
  }

  getemail(): any {
    //return this.cookieService.get(this.EMAIL_ID);
    return localStorage.getItem(this.EMAIL_ID);
  }

  removeToken() {
    localStorage.clear();
  }
}
