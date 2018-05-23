import { Component, Input, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Language } from 'angular-l10n';

import { SessionService } from '../ngx-tryton';

// Models
import { User } from '../user/user.model'
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class TrytonLoginComponent{
  @Language() lang: string;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  currentUserId: number;

  constructor(private formBuilder: FormBuilder,
              public sessionService: SessionService,
              private router: Router) {
  };

  ngOnInit() {
    if (sessionStorage.getItem('sessionId')) {
      this.router.navigateByUrl(environment.navigate_login);
    }
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.login(this.f.username.value, this.f.password.value);
  }

  public login(login, password) {
    this.sessionService.doLogin(environment.database, login, password).subscribe(
      data => {
          if (data['userId'] && data['sessionId']) {
            this.router.navigateByUrl(environment.navigate_login);
          }
          else if (data) {
            alert('Incorrect username or password')
          }
        },
      err => {
        alert(err);
      }
    );
  }
}
