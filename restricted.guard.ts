import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { SessionService } from '../ngx-tryton';
import { settings } from '../../settings';

@Injectable()
export class RestrictedGuard implements CanActivate {
  constructor(private sessionService: SessionService,
              private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.sessionService.isLoggedIn()) {
        return true;
      } else {
        this.router.navigateByUrl(settings.navigate_logout);
      }
      return false;
  }
}
