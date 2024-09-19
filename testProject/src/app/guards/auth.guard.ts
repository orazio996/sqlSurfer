import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { UtilityService } from '../Services/utility.service';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router)
  const token = localStorage.getItem("token");
  const decodedToken = UtilityService.parseJwt(token);
  const currentTime = Math.floor(Date.now() / 1000);
  if(!token || decodedToken.payload.exp < currentTime) {
    console.error('Unauthorized');
    router.navigate(['/error'], {queryParams:{message:'Anauthorized'}});
    return false;
  }
  return true;
};
