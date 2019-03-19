import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { SesionService } from '../../../../shared/services/sesion.service';
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


  constructor(
    private _builder: FormBuilder,
    private _usuarios: UsuariosService,
    private _sesion: SesionService,
    private _router: Router
  ){}

  ngOnInit() {
    this.crearFormulario();
    if (!this._sesion.sesionEstaIniciada())
      this._router.navigateByUrl('/signin');
    else{
      this._usuarios.devolverUsuarios().subscribe(grupoUsuarios=> {
        for (let i=0; i<grupoUsuarios.length; i++)
          if (this._sesion.usuarioSesion().id===grupoUsuarios[i]['identificacion'].usuario){
            this.usuario_actual=grupoUsuarios[i];
            this.seccion_actual=this.usuario_actual['formacion'];
            this.rellenarFormulario();
            this.terminarEdicion();
          }
        });
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

  terminarEdicion(){
      this.numElementoEnEdicion=-1;
      this.editandoCampo=false;
      this.formulario.disable();
      this.guardarCambios();
  }


  borrar(elemento){
    (this.formulario.controls['datos'] as FormArray).removeAt(elemento);
  }

  guardarCambios(){
    this.seccion_actual=this.formulario.value;
    this.usuario_actual['formacion']=this.formulario.value;
    this._usuarios.actualizarUsuario(this.usuario_actual);
  }

  editarCampo (elemento){
    this.editandoCampo=true;
    this.numElementoEnEdicion=elemento;
    ((<FormArray>this.formulario.get('datos')).controls[elemento]).enable();
  }

}
