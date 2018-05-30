import { Component, Input, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../ngx-tryton';

import { environment } from '../../environments/environment';
import { settings } from '../../settings';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class TrytonLogoutComponent{

  constructor(public sessionService: SessionService,
              private router: Router) {
  };

  ngOnInit() {
    this.logout();
  }

  public logout() {
    this.sessionService.doLogout().subscribe(
      res => {
        console.log('Logout');
      },
      error => {
        console.log(error);
      }
    )
    this.sessionService.clearSession();
    this.router.navigateByUrl(settings.navigate_logout);
  }
}
