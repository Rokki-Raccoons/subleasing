import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
                private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(this.authService.isAuthenticated())
    // @ts-expect-error
    return this.authService.isAuthenticated().pipe(map((response: { authenticated: boolean}) => {
            if (response.authenticated) {
                return true;
            }
            this.router.navigate(['/login']);
            return false;
        }), catchError((error) => {
            this.router.navigate(['/login']);
            return of(false);
        }));
    }

}
