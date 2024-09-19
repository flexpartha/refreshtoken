import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { refreshTokenInterceptor } from './interceptor/refresh-token.interceptor';
import { httpcookieRefreshtokenInterceptor } from './interceptor/httpcookie-refreshtoken.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideHttpClient(
      withInterceptors([
        //refreshTokenInterceptor,
        httpcookieRefreshtokenInterceptor,
      ])
    ),
  ],
};
