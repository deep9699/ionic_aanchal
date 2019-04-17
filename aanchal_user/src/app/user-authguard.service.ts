import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthguardService {

  constructor() { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(localStorage.getItem('email_id')!=undefined || localStorage.getItem('customer_id')!=undefined)
    {
      return false;
    }
    else
    {
      return true;
    }
  }
}
