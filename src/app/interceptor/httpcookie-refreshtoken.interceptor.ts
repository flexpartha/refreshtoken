import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpcookieRefreshtokenService } from '../service/httpcookie-refreshtoken.service';
import { ResponseData } from '../userModel/userResponse.interface';
import { catchError, delay, tap, throwError } from 'rxjs';

export const httpcookieRefreshtokenInterceptor: HttpInterceptorFn = (
  req,
  next
) => {
  const httpcookieRefreshServ = inject(HttpcookieRefreshtokenService);
  const router = inject(Router);
  const ngZone = inject(NgZone);
  let loggedUserData!: ResponseData;

  let storeData = httpcookieRefreshServ.getToken();
  console.log('storeData::--', storeData);
  if (storeData != null) {
    loggedUserData = JSON.parse(storeData);
    console.log(loggedUserData);
  }
  // Clone the request and add the authorization header
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${loggedUserData?.token}`,
    },
  });
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        ngZone.run(() => {
          console.log('cors Error detected, showing alert');
          window.alert(
            'A CORS error occurred. Please check your API server settings.'
          );
          console.log('Alert shown, proceeding to refresh token');
        });
      }
      if (error.status === 401) {
        //const isRefresh = confirm('Your session is expired. Do you continue?');
        // if (isRefresh) {
        //   httpcookieRefreshServ.$refreshToken.next(true);
        // }
        ngZone.run(() => {
          console.log('401 Error detected, showing alert');
          window.alert('Your session is expired. Do you continue?');
          console.log('Alert shown, proceeding to refresh token');
        });
        location.reload();
        return httpcookieRefreshServ.getRefreshToken().pipe(
          tap((response): any => {
            const newToken = response.data;
            if (newToken) {
              const clonedRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken?.token}`,
                },
              });
              return next(clonedRequest);
            }
          })
        );
      }
      if (error.status === 400) {
        httpcookieRefreshServ.removeToken();
        router.navigate(['/login2']);
      }
      return throwError(error);
    })
  );
};
