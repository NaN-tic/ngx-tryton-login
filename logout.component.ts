import { Component, Input, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../ngx-tryton';

// Models
import { environment } from '../../environments/environment';

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
    this.sessionService.doLogout();
    this.router.navigateByUrl(environment.navigate_logout);
  }
}
