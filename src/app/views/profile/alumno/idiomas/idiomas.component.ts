import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { SesionService } from '../../../../shared/services/sesion.service';
import { Router } from '@angular/router';
import { formatoFecha } from '../../../../shared/validadores';


@Component({
  selector: 'app-idiomas',
  templateUrl: './idiomas.component.html',
  styleUrls: ['./idiomas.component.scss']
})
export class IdiomasComponent implements OnInit {
  matrizNombreIdiomas=["Español", "Inglés", "Francés", "Aleḿan", "Italiano", "Otro"];
  matrizNivelIdioma=['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
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
      idioma: new FormControl(''),
      otro: new FormControl(''),
      nivel: new FormControl('', Validators.required),
      fecha: new FormControl('', formatoFecha)
    });
   }

   rellenarFormulario(numElemento){
      if (!this.matrizNombreIdiomas.includes(this.seccion_actual[numElemento].idioma)){
        this.formulario.controls['idioma'].setValue('Otro');
        this.otroIdioma=true;
        this.formulario.controls['otro'].setValue(this.seccion_actual[numElemento].idioma);
      }else
        this.formulario.controls['idioma'].setValue(this.seccion_actual[numElemento].idioma);
      this.formulario.controls['nivel'].setValue(this.seccion_actual[numElemento].nivel);
      this.formulario.controls['fecha'].setValue(this.seccion_actual[numElemento].fecha);
   }

   siIdiomaCambia(event:any){
      if (event.target.value==="Otro"){
        this.otroIdioma=true;
        this.formulario.controls['otro'].setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(255)]);
      }else
        this.otroIdioma=false;
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
         console.log ('');
     });
     //Mejora: refrescar el componente actual en vez de volver
     this._router.navigateByUrl('/profile/alumno');
   }

   guardarCambios(){
    let aux={idioma:"", nivel: "", fecha: ""};
     if (this.otroIdioma)
        aux.idioma=this.formulario.controls['otro'].value;
     else
        aux.idioma=this.formulario.controls['idioma'].value;
     aux.nivel=this.formulario.controls['nivel'].value;
     aux.fecha=this.formulario.controls['fecha'].value;
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
