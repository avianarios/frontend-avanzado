import { Injectable } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { UsuariosService } from '../../../shared/services/usuarios.service';
import { SesionService } from '../../../shared/services/sesion.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
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
  ) { }


/*  crearFormulario(){
    return (this.formulario=this._builder.group({
      datos: new FormArray([])
    }));
  }*/

  cargaDatos(seccion){
    if (!this._sesion.sesionEstaIniciada()){
    return (this.formulario);
      this._router.navigateByUrl('/signin');
    }else{
      this._usuarios.devolverUsuarios().subscribe(grupoUsuarios=> {
        for (let i=0; i<grupoUsuarios.length; i++)
          if (this._sesion.usuarioSesion().id===grupoUsuarios[i]['identificacion'].usuario){
            this.usuario_actual=grupoUsuarios[i];
            this.seccion_actual=this.usuario_actual[seccion];
//            this.rellenarFormulario();
//            this.terminarEdicion();
          }
        });
      }
  }


//PROBLEMA: Hay funciones muy parecidas, pero no iguales. Se diferencian en el formulario que crean, por lo que habría que pasarle un parámetro para diferenciar un caso de otro o dejar código en cada componente
  rellenarFormulario(){
      if ((Object.keys (this.seccion_actual)[0])==="0"){ //si la primera llave es un número es porque se le ha pasado una matriz con más de un título donde cada fila es un título
        this.seccion_actual.forEach (elemento =>{
        (this.formulario.controls['datos'] as FormArray).push(this.crearElemento(elemento));
      });
      }else  //solo se le ha pasado un título
        (this.formulario.controls['datos'] as FormArray).push(this.crearElemento(this.seccion_actual));
//    return this.formulario;
  }

  crearElemento(datos){
    this.numElementoEnEdicion=((<FormArray>this.formulario.controls['datos']).controls.length);
    this.editandoCampo=true;
    return this._builder.group({
      idioma: [datos.idioma],
      nivel: [datos.nivel],
      fecha: [datos.fecha]
    });
  }*/
}
