import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  //using platform to avoid crash with SSR
  const _PLATFORM_ID = inject(PLATFORM_ID);

  if (isPlatformBrowser(_PLATFORM_ID)) { // do not run on server side to avoid errors with localStorage
    //request => send headers

    if (localStorage.getItem('socialToken') !== null) {

      req = req.clone({

        setHeaders: {
          token: localStorage.getItem('socialToken')!
        }
      })
    }
  }

  //response
  return next(req);
};
