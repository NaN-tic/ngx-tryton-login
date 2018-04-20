import {Component, Input, ViewChild, } from '@angular/core';
import {Router} from '@angular/router';
import { SessionService } from '../ngx-tryton';
import { Language } from 'angular-l10n';

// Models
import { User } from '../user/user.model'
import { environment } from '../../environments/environment';


@Component({
  selector: 'login-tryton',
  templateUrl: './login.html',
  styleUrls: ['./login-tryton.scss']
})
export class TrytonLoginPage{

  currentUserId: number;
  @Input() user: User;
  @ViewChild('user_name') user_name;
  @ViewChild('user_pass') user_pass;
  @Language() lang: string;

  constructor( public sessionService: SessionService, private router: Router) {};


  public login(event) {
    event.preventDefault();
    const login = this.user_name.nativeElement.value;
    const password = this.user_pass.nativeElement.value;
    this.sessionService.doLogin(environment.database, login, password).subscribe(
      data => {
          if (data['userId'] && data['sessionId']) {
            this.router.navigateByUrl('/select-company');
          }
          else if (data) {
            alert('Incorrect username or password')
          }
        },
      err => {
        alert(err)
      }
    );
  }

  public getCurrentUserPermissions() {
    this.currentUserId = this.sessionService.isLoggedInPermissions();
  }

}
