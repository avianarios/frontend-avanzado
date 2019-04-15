import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninService } from './signin.service';
import { ProfileService } from 'src/app/shared/services/profile.service';

import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
//import { AppState } from '../../store/state/app.state';
//import { selectSelectedUser } from '../../store/selectors/user.selector';
import { Cargar } from '../../shared/store/actions/user.actions';
import { UserState } from '../../shared/store/state/user.state';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  errorLogin = false;
  constructor(
    private signinService: SigninService,
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _store: Store<UserState>
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    this.signinService.login({ ...this.loginForm.value }).then(user => {
      if (!user) {
        this.errorLogin = true;
        return;
      }
      this.profileService.user = user;
this._store.dispatch(new Cargar (user));


      this.router.navigate(['admin/dashboard']);
    });
  }
}
