import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { sinEspacios, noSoloNumeros } from '../../../shared/validadores';
import { UsuariosService } from '../../../shared/services/usuarios.service';
import { SesionService } from '../../../shared/services/sesion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {
  usuario_actual: Array<any>=[];
  listaProvincias=['Almería', 'Cádiz', 'Córdoba', 'Granada', 'Jaén', 'Huelva', 'Málaga', 'Sevilla'];
  formulario: FormGroup;
  editandoEmpresa:boolean=false;

  constructor(
      private _builder: FormBuilder,
      private _usuarios: UsuariosService,
      private _sesion: SesionService,
      private _router: Router
    ) { }

  ngOnInit() {
    this.crearFormulario();
    if (!this._sesion.sesionEstaIniciada())
      this._router.navigateByUrl('/signin');
    else{
      this.usuario_actual=this._sesion.usuarioSesion();
      this.rellenarFormulario();
      this.deshabilitarFormulario();
    }
  }

  crearFormulario(){
    this.formulario= this._builder.group({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255), sinEspacios]),
      razon: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255), sinEspacios]),
      cif: new FormControl(''),
      direccion: new FormControl(''),
      provincia: new FormControl(''),
      municipio: new FormControl(''),
      url: new FormControl(''),
      nombre_contacto: new FormControl(''),
      apellidos: new FormControl(''),
      telefono: new FormControl('', noSoloNumeros),
      correo: new FormControl('', Validators.email)
    });
  }

  rellenarFormulario(){
    for (let llave in this.usuario_actual['generales'])
        this.formulario.controls[llave].setValue(this.usuario_actual['generales'][llave]);
  }

  editarElemento (){
    this.editandoEmpresa=true;
    this.formulario.enable();
  }

  deshabilitarFormulario(){
    this.editandoEmpresa=false;
    this.formulario.disable();
    this.guardarCambios();
  }

  guardarCambios(){
    this.usuario_actual['generales'] = this.formulario.value;
    this._usuarios
      .actualizarUsuario(this.usuario_actual)
      .subscribe(user => console.log(user));
  }
}
