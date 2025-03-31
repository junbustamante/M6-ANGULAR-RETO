import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { StateLogin } from "./state/state-login";

@Injectable({providedIn: 'root'})
export class rutaGuard implements CanActivate {
  

  constructor(private router: Router, private state: StateLogin) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    let email = '';
    this.state.userEmail$.subscribe((value) => {
      email = value
    });
    console.log(email);
    if (email  == 'djbustam@gmail.com') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}