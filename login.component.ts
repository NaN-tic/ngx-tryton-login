import { Component, Input, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocaleService, Language } from 'angular-l10n';
import { Observable } from 'rxjs/Observable';

import { SessionService } from '../ngx-tryton';

// Models
import { User } from '../user/user.model'

import { environment } from '../../environments/environment';
import { settings } from '../../settings';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class TrytonLoginComponent{
  @Language() lang: string;
  loginForm: FormGroup;
  loading = false;
  currentUserId: number;

  constructor(private formBuilder: FormBuilder,
              public locale: LocaleService,
              public sessionService: SessionService,
              private router: Router) {
  };

  ngOnInit() {
    if (sessionStorage.getItem('sessionId')) {
      this.router.navigateByUrl(settings.navigate_login);
    }
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.login(this.f.username.value, this.f.password.value);
  }

  public login(login, password) {
    this.sessionService.doLogin(environment.database, login, password, false).subscribe(
      data => {
          if (data['userId'] && data['sessionId']) {
            this.getPreferences().subscribe(response => {
              this.router.navigateByUrl(settings.navigate_login);
            });
          }
          else if (data) {
            alert('Incorrect username or password');
          }
        },
      err => {
        alert('Incorrect username or password');
      }
    );
  }

  public getPreferences(): Observable<boolean> {
    return this.sessionService.rpc('model.res.user.get_preferences', [true], {})
      .map(preferences => {
        let language = preferences['language'] || 'en';
        this.sessionService.setDefaultContext(preferences);
        this.locale.setCurrentLanguage(language);
        return true;
      });
  }
}
