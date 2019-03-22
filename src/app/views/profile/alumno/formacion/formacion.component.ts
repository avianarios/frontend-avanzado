import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { SesionService } from '../../../../shared/services/sesion.service';
import { AlumnoService } from '../alumno.service';
import { Router } from '@angular/router';
//import { formatoFecha } from '../../../../shared/validadores';

@Component({
  selector: 'app-formacion',
  templateUrl: './formacion.component.html',
  styleUrls: ['./formacion.component.scss']
})
export class FormacionComponent implements OnInit {
  formulario: FormGroup;
  usuario_actual: Array<any>=[];
  seccion_actual: Array<any>=[];
  numElementoEnEdicion:number;
  editandoCampo:boolean=false;
  kk: Array<any>=[];

  constructor(
    private _builder: FormBuilder,
    private _usuarios: UsuariosService,
    private _sesion: SesionService,
    private _alumno: AlumnoService,
    private _router: Router
  ){}

  ngOnInit() {
    this.crearFormulario();
    if (!this._sesion.sesionEstaIniciada())
      this._router.navigateByUrl('/signin');
    else{
      this.usuario_actual=this._sesion.usuarioSesion();
      this.seccion_actual=this.usuario_actual['formacion'];
      this.rellenarFormulario();
      this.deshabilitarFormulario();
    }
  }

    crearFormulario(){
      this.formulario= this._builder.group({
        datos: new FormArray([])
      });
    }

    rellenarFormulario(){
      if ((Object.keys (this.seccion_actual)[0])==="0"){ //si la primera llave es un número es porque se le ha pasado una matriz con más de un título donde cada fila es un título
        this.seccion_actual.forEach (elemento =>{
          (this.formulario.controls['datos'] as FormArray).push(this.crearElemento(elemento));
        });
      }else  //solo se le ha pasado un título
        (this.formulario.controls['datos'] as FormArray).push(this.crearElemento(this.seccion_actual));
    }

    anyadirElemento(){
      (this.formulario.controls['datos'] as FormArray).push(this.crearElemento(["", "", "", "", ""]));
    }

    crearElemento(datos){
      this.numElementoEnEdicion=((<FormArray>this.formulario.controls['datos']).controls.length);
      this.editandoCampo=true;
      return this._builder.group({
        nivel: [datos.nivel],
        titulo: [datos.titulo],
        centro: [datos.centro],
        familia: [datos.familia],
        fecha: [datos.fecha],
        certificado: [datos.certificado]
      })
  }

  deshabilitarFormulario(){
    this.numElementoEnEdicion=-1;
    this.editandoCampo=false;
    this.formulario.disable();
  }

  terminarEdicion(){
      this.deshabilitarFormulario();
      this.guardarCambios();
  }

  borrarElemento(posicion){
    (this.formulario.controls['datos'] as FormArray).removeAt(posicion);
    this.seccion_actual.splice(posicion, 1);
    this.guardarCambios();
  }

  guardarCambios(){
    this.usuario_actual['formacion']=[];
    this.formulario.controls['datos'].value.forEach(valor=>{
        this.usuario_actual['formacion'].push(valor);
    });
    this._usuarios
      .actualizarUsuario(this.usuario_actual)
      .subscribe(user => {  //hay que suscribirse para que funcione (por cómo funciona el http de angular)
        console.log ('');
        if (this.usuario_actual['formacion'].length===0)
          this._alumno.cambiarVariable('formacion', false);
        else
          this._alumno.cambiarVariable('formacion', true);
    });
  }

  editarCampo (elemento){
    this.editandoCampo=true;
    this.numElementoEnEdicion=elemento;
    ((<FormArray>this.formulario.get('datos')).controls[elemento]).enable();
  }

}
