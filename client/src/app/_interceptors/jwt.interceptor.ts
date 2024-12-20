import { HttpInterceptorFn } from '@angular/common/http';
import { AccountService } from '../services/account.service';
import { inject } from '@angular/core';

// This is the function that will intercept every HTTP request made by the app
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  // Access the AccountService to get information about the current user
  const accountService = inject(AccountService)

  // Check if the user is logged in (i.e., if there is a current user)
  if (accountService.currentUser()) {
    // If the user is logged in, add an Authorization header to the request with the JWT token
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accountService.currentUser()?.token}`  // Attach the JWT token in the request
      }
    })
  }

  // Send the modified (or unchanged) request to the next step in the HTTP process
  return next(req);
};