import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { ResponseData } from '../userModel/userResponse.interface';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { RefreshtokenService } from '../service/refreshtoken.service';
import { Router } from '@angular/router';

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const refreshServ = inject(RefreshtokenService);
  const router = inject(Router);
  let loggedUserData!: ResponseData;

  const storeData = localStorage.getItem('angular17data');
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

  // Pass the cloned request with the updated header to the next handler
  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        const isRefresh = confirm('Your session is expired. Do you continue?');
        if (isRefresh) {
          refreshServ.$refreshToken.next(true);
        }
      }
      if (err.status === 400) {
        router.navigate(['/login']);
      }
      return throwError(err);
    })
  );
};
