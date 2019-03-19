import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { formatoFecha } from '../../../../shared/validadores';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { SesionService } from '../../../../shared/services/sesion.service';
import { Router } from '@angular/router';
//import { formatoFecha } from '../../../../shared/validadores';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.scss']
})
export class ExperienciaComponent implements OnInit {
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
            this.seccion_actual=this.usuario_actual['experiencia'];
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
      console.log (this.formulario);
      if ((Object.keys (this.seccion_actual)[0])==="0"){ //si la primera llave es un número es porque se le ha pasado una matriz con más de un título donde cada fila es un título
        this.seccion_actual.forEach (elemento =>{
          (this.formulario.controls['datos'] as FormArray).push(this.crearElemento(elemento));
        });
      }else  //solo se le ha pasado un título
        (this.formulario.controls['datos'] as FormArray).push(this.crearElemento(this.seccion_actual));
    }

    anyadirElemento(){
      (this.formulario.controls['datos'] as FormArray).push(this.crearElemento(["", "", ""]));
    }

    crearElemento(datos){
      this.numElementoEnEdicion=((<FormArray>this.formulario.controls['datos']).controls.length);
      this.editandoCampo=true;

      /*return this._builder.group({
        empresa: [datos.empresa],
        cargo: [datos.cargo],
        fecha: [datos.fecha]
      })*/

      return this._builder.group({
        empresa:  new FormControl(datos.empresa),
        cargo:  new FormControl(datos.cargo),
        fecha: new FormControl(datos.fecha, formatoFecha)
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
    this.usuario_actual['experiencia']=this.formulario.value;
    this._usuarios
      .actualizarUsuario(this.usuario_actual)
      .subscribe(user => console.log(user));
  }

  editarCampo (elemento){
    this.editandoCampo=true;
    this.numElementoEnEdicion=elemento;
    ((<FormArray>this.formulario.get('datos')).controls[elemento]).enable();
  }

}
