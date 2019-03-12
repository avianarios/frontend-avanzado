import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { UsuariosService } from '../../shared/services/usuarios.service';
import { Router } from '@angular/router';
import { SesionService } from '../../shared/services/sesion.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  usuarios: any[] = [];
  loginForm: FormGroup = this._builder.group({
    usuario: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    clave: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  constructor(
    private _builder: FormBuilder,
    private _usuarios: UsuariosService,
    private _router: Router,
    private _sesion: SesionService
  ) {}

  private isUser(user, { username, password }) {
    return (
      user['identificacion'].usuario === username &&
      user['identificacion'].clave === password
    );
  }

  login() {
    const credentials = {
      username: this.loginForm.value.usuario,
      password: this.loginForm.value.clave
    };
    const user = this.usuarios.find(_user => this.isUser(_user, credentials));
    if (user) {
      this._sesion.iniciarSesion(user['identificacion'].usuario, user.tipo);
      this._router.navigateByUrl('/dashboard');
    }
    /*     for (const usuario of this.usuarios) {
      if (
        usuario['identificacion'].usuario === this.loginForm.value.usuario &&
        usuario['identificacion'].clave === this.loginForm.value.clave
      ) {
        this.autenticado = true;
        this._sesion.iniciarSesion(
          usuario['identificacion'].usuario,
          usuario.tipo
        );
        this._router.navigateByUrl('/dashboard');
      }
    } */
  }

  recordar() {
    this._router.navigateByUrl('/forgot-password');
  }

  ngOnInit() {
    this._usuarios.devolverUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }
}
