import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { formatoFecha } from '../../../../shared/validadores';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { SesionService } from '../../../../shared/services/sesion.service';
import { Router } from '@angular/router';

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
  editandoElemento:boolean=false;
  creandoElemento:boolean=false;
  llaves: Array<any>=[];
  valores:Array<any>=[];

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
      this.usuario_actual=this._sesion.usuarioSesion();
      this.seccion_actual=this.usuario_actual['experiencia'];
      this.cargarDatos(this.llaves, this.valores, 'experiencia');
    }
  }

  cargarDatos(llaves, valores, cual){
    if (this.usuario_actual[cual].length>0){
      llaves.push(Object.keys (this.usuario_actual[cual][0]));
      this.usuario_actual[cual].forEach (datos=>{
        valores.push (Object.values(datos));
      });
    }
  }

  crearFormulario(){
   this.formulario=this._builder.group({
    empresa: new FormControl('', [Validators.minLength(3), Validators.maxLength(255)]),
    cargo: new FormControl('', [Validators.minLength(3), Validators.maxLength(255)]),
    inicio: new FormControl('', formatoFecha),
    fin: new FormControl('', formatoFecha),
    tareas: new FormControl('')
  });
 }

 rellenarFormulario(numElemento){
    this.formulario.controls['empresa'].setValue(this.seccion_actual[numElemento].empresa);
    this.formulario.controls['cargo'].setValue(this.seccion_actual[numElemento].cargo);
    this.formulario.controls['inicio'].setValue(this.seccion_actual[numElemento].inicio);
    this.formulario.controls['fin'].setValue(this.seccion_actual[numElemento].fin);
    this.formulario.controls['tareas'].setValue(this.seccion_actual[numElemento].tareas);
 }

 nuevoElemento(){
   this.editandoElemento=false;
   this.creandoElemento=true;
   this.numElementoEnEdicion=this.seccion_actual.length;
}

   borrarElemento(posicion){
     this.seccion_actual.splice(posicion,1);
     this._usuarios
       .actualizarUsuario(this.usuario_actual)
       .subscribe(user => {  //hay que suscribirse para que funcione (por cómo funciona el http de angular)
         console.log (user);
     });
     //Mejora: refrescar el componente actual en vez de volver
     this._router.navigateByUrl('/profile/alumno');
   }

   guardarCambios(){
     let aux={empresa:"", cargo: "", inicio: "", fin: "", tareas:""};
     aux.empresa=this.formulario.controls['empresa'].value;
     aux.cargo=this.formulario.controls['cargo'].value;
     aux.inicio=this.formulario.controls['inicio'].value;
     aux.fin=this.formulario.controls['fin'].value;
     aux.tareas=this.formulario.controls['tareas'].value;
     this.seccion_actual[this.numElementoEnEdicion]=aux;
     this._usuarios
       .actualizarUsuario(this.usuario_actual)
       .subscribe(user => {  //hay que suscribirse para que funcione (por cómo funciona el http de angular)
         console.log ('');
     });
     this.cargarDatos(this.llaves, this.valores, 'idiomas');
     this._router.navigateByUrl('/profile/alumno');
   }

   editarElemento (posicionElemento){
     this.editandoElemento=true;
     this.numElementoEnEdicion=posicionElemento;
     this.rellenarFormulario(posicionElemento);
   }

}
