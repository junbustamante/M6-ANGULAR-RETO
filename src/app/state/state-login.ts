import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";    

@Injectable({providedIn: 'root'})
export class StateLogin implements CanActivate {
  private _userEmail = new BehaviorSubject<string>('');
  private _userPassword = new BehaviorSubject<string>('');

  get userEmail$(): Observable<string> {
    return this._userEmail.asObservable();
  }

  set userEmail(value: string) {
    this._userEmail.next(value);
  }

  get userPassword$(): Observable<string> {
    return this._userPassword.asObservable();  
  }     
  set userPassword(value: string) {
    this._userPassword.next(value);
    }

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this._userEmail.value) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
  login() {
    this._userEmail.next('true');
  }

  logout() {
    this._userEmail.next('');
  }
}