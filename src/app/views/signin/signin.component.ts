import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppStore } from 'src/app/shared/states/store.interface';
import * as AuthActions from 'src/app/shared/states/auth/actions/auth.actions';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  errorLogin = false;
  constructor(private store$: Store<AppStore>) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false),
    });
  }

  onSubmit() {
    this.submitted = true;
    this.store$.dispatch(new AuthActions.Identification({...this.loginForm.value}));
  }
}
