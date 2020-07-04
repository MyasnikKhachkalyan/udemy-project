import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';
import {map, take} from 'rxjs/operators';
import {User} from '../../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class NotLoggedInGuard implements CanActivate, CanLoad {
  constructor(private readonly authService: AuthService, private readonly router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.userData.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        if (!isAuth) {
          return true;
        }
        this.router.navigate(['/', 'recipes']);
        return false;
      })
    );
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.userData.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        if (!isAuth) {
          return true;
        }
        this.router.navigate(['/', 'recipes']);
        return false;
      })
    );
  }
}
