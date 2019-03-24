import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { SesionService } from '../../../../shared/services/sesion.service';
import { AlumnoService } from '../alumno.service';
import { Router } from '@angular/router';
import { formatoFecha } from '../../../../shared/validadores';


@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.component.html',
  styleUrls: ['./idiomas.component.scss']
})
export class IdiomasComponent implements OnInit {
  nombreIdiomas=["Español", "Inglés", "Francés", "Aleḿan", "Italiano", "Otro"];
  nivelIdioma=['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  formulario: FormGroup;
  usuario_actual: Array<any>=[];
  seccion_actual: Array<any>=[];
  numElementoEnEdicion:number;
  editandoElemento:boolean=false;
  creandoElemento:boolean=false;
  otroIdioma:boolean=false;
  llaves: Array<any>=[];
  valores:Array<any>=[];

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
      this.seccion_actual=this.usuario_actual['idiomas'];
      this.cargarDatos(this.llaves, this.valores, 'idiomas');
/*      this.rellenarFormulario();
      this.deshabilitarFormulario();*/
    }
//    this.cuandoCambie();
  }

    cargarDatos(llaves, valores, cual){
      llaves.push(Object.keys (this.usuario_actual[cual][0]));
      this.usuario_actual[cual].forEach (datos=>{
        valores.push (Object.values(datos));
      });
    }

    crearFormulario(){
     this.formulario=this._builder.group({
      idioma: new FormControl(''),
      otro: new FormControl(''),
      nivel: new FormControl('', Validators.required),
      fecha: new FormControl('', formatoFecha)
    });
   }

   rellenarFormulario(numElemento){
       this.formulario.controls['idioma'].setValue(this.seccion_actual[numElemento].idioma);
       this.formulario.controls['nivel'].setValue(this.seccion_actual[numElemento].nivel);
       this.formulario.controls['fecha'].setValue(this.seccion_actual[numElemento].fecha);
   }

   siIdiomaCambia(event:any){
      if (event.target.value==="Otro"){
        this.otroIdioma=true;
        this.formulario.controls['otro'].setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(255)]);
      }
   }

   terminarEdicion(){
       this.guardarCambios();
       this.llaves=[];
       this.valores=[];
       this.cargarDatos(this.llaves, this.valores, 'idiomas');
       this.editandoElemento=false;
       this.creandoElemento=false;
   }

   nuevoElemento(){
     this.editandoElemento=false;
     this.creandoElemento=true;
   }

   borrarElemento(posicion){
     this.usuario_actual['idiomas'].splice(posicion,1);
     this._usuarios
       .actualizarUsuario(this.usuario_actual)
       .subscribe(user => {  //hay que suscribirse para que funcione (por cómo funciona el http de angular)
         console.log ('');
     });
     //Mejora: refrescar el componente actual en vez de volver
     this._router.navigateByUrl('/profile/alumno');
   }

   guardarCambios(){
    let aux="";
     if (this.formulario.controls['idioma'].value==="Otro")
       aux={
         idioma: this.formulario.controls['otro'].value,
         nivel: this.formulario.controls['nivel'].value,
         fecha: this.formulario.controls['fecha'].value,
       };
     else
       aux={
         idioma: this.formulario.controls['idioma'].value,
         nivel: this.formulario.controls['nivel'].value,
         fecha: this.formulario.controls['fecha'].value,
       };
     this.usuario_actual['idiomas'].splice(this.numElementoEnEdicion, 0, aux);
     this._usuarios
       .actualizarUsuario(this.usuario_actual)
       .subscribe(user => {  //hay que suscribirse para que funcione (por cómo funciona el http de angular)
         console.log ('');
     });
console.log (this.usuario_actual)     ;
     this._router.navigateByUrl('/profile/alumno');
   }

   editarElemento (posicionElemento){
     this.editandoElemento=true;
     this.numElementoEnEdicion=posicionElemento;
     this.rellenarFormulario(posicionElemento);
     this.seccion_actual.splice(posicionElemento,1);
   }

  /*cuandoCambie(){
    this.formulario.get('datos').valueChanges.subscribe(valor => {
      if (valor[0].idioma==="Otro")
        this.otroIdioma=true;
//this.formulario.get('datos').setValue(

      else this.otroIdioma=false;
    });

  }*/
/*
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
      idioma: [datos.idioma],
      otro: [""],
      nivel: [datos.nivel],
      fecha: [datos.fecha]
    });
  }

  deshabilitarFormulario(){
    this.numElementoEnEdicion=-1;
    this.editandoCampo=false;
    this.formulario.disable();
  }

  terminarEdicion(){
console.log (this.formulario);
      this.deshabilitarFormulario();
      this.guardarCambios();
  }

  borrarElemento(posicion){
    (this.formulario.controls['datos'] as FormArray).removeAt(posicion);
    this.seccion_actual.splice(posicion, 1);
    this.guardarCambios();
  }


  guardarCambios(){
    this.usuario_actual['idiomas']=[];
    this.formulario.controls['datos'].value.forEach(valor=>{
        this.usuario_actual['idiomas'].push(valor);
    });
    this._usuarios
      .actualizarUsuario(this.usuario_actual)
      .subscribe(user => {  //hay que suscribirse para que funcione (por cómo funciona el http de angular)
        console.log ('');
        if (this.usuario_actual['idiomas'].length===0)
          this._alumno.cambiarVariable('idiomas', false);
        else
          this._alumno.cambiarVariable('idiomas', true);
    });
  }

  editarElemento (elemento){
    this.editandoCampo=true;
    this.numElementoEnEdicion=elemento;
    ((<FormArray>this.formulario.get('datos')).controls[elemento]).enable();
  }*/
}
