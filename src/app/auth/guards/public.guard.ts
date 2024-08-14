import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, UrlSegment, GuardResult, MaybeAsync, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  private checkAuthStatus(): MaybeAsync<GuardResult> {
    return this.authService.checkAuthenticationStatus()
               .pipe(
                tap( isAuthenticated => {
                  if (isAuthenticated) this.router.navigate(['./'])
                } ),
                map(isAuthenticated => !isAuthenticated)
               )
  }

  canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
    // console.log('can match');
    // console.log({route, segments});
    // return false;

    return this.checkAuthStatus();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    // console.log('can activate');
    // console.log({route, state});
    // return false;

    return this.checkAuthStatus();
  }

}
