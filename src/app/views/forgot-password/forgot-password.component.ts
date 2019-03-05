import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../../shared/services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  alumnos: any[] = [];
  existe:boolean=false;
  correo = new FormControl('', [Validators.required, Validators.email]);

  constructor(private _usuariosService: UsuariosService, private _router: Router) { }

  ngOnInit() {
    this._usuariosService.devolverUsuarios().subscribe(data => {
      this.alumnos = data;
    });
  }

  recordar() {
    for (let i of this.alumnos)
        if (i.correo===this.correo.value){
          console.log ("La clave es"+i.clave);
          this.existe=true;
        }
  }

  iniciarSesion(){
    this._router.navigateByUrl('/signin');
  }

}
