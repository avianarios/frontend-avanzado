import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UsuariosService } from '../../../shared/services/usuarios.service';
import { SesionService } from '../../../shared/services/sesion.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-empresa-offers',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {
  usuario_actual:Array<any>=[];
  seccion_actual:Array<any>=[];
  llaves: Array<any>=[];
  valores: Array<any>=[];
  numOferta: number=-1;
  codPuestoSolicitado:string;
  //tengo que dividir a los candidatos en dos matrices, llaves y valores, porque ngfor solo puede iterar por matrices y no por objetos
  llavesCandidatos: Array<any>=[];
  valoresCandidatos: Array<any>=[];
  formulario: FormGroup;
  numElementoEnEdicion:number;
  editandoCampo:boolean=false;
  valoresCandidatosSeleccionados: Array<any>=[];
  valoresCandidatosDescartados: Array<any>=[];

  constructor( private _builder: FormBuilder, private _usuarios: UsuariosService, private _sesion: SesionService, private _router: Router) { }

  ngOnInit() {
    this.crearFormulario();
    if (!this._sesion.sesionEstaIniciada())
      this._router.navigateByUrl('/signin');
    else{
      this.usuario_actual=this._sesion.usuarioSesion();
      this.seccion_actual=this.usuario_actual["ofertas"];
/*      Object.keys (this.seccion_actual[0]).forEach (llave=>{
        this.llaves.push (llave);
      })*/
      if (this.seccion_actual.length>0){
        this.llaves.push(Object.keys (this.seccion_actual[0]));
        this.seccion_actual.forEach (oferta=>{
          this.valores.push (Object.values (oferta));
        });
      }
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
        (this.formulario.controls['datos'] as FormArray).push(this.crearOferta(elemento));
      });
    }else  //solo se le ha pasado un título
      (this.formulario.controls['datos'] as FormArray).push(this.crearOferta(this.seccion_actual));
  }

  anyadirElemento(tipo, matriz){
    (this.formulario.controls['datos'] as FormArray).push(this.crearOferta(["", "", "", "", "", "", ""]));
  }

  crearOferta(datos){
    this.numElementoEnEdicion=((<FormArray>this.formulario.controls['datos']).controls.length);
    this.editandoCampo=true;
    return this._builder.group({
      idPuesto: [datos.idPuesto],
      puesto: [datos.puesto],
      familia: [datos.familia],
      fecha: [datos.fecha],
      descripcion: [datos.descripcion],
      provincia: [datos.provincia],
      municipio: [datos.municipio],
      titulos: [datos.titulos]
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
    this.valores.splice(posicion, 1);
    this.guardarCambios();
  }


  gestionarCandidatos(cual){
    this.valoresCandidatos=[];
    this.numOferta=cual;
    this.codPuestoSolicitado=((<FormArray>this.formulario.get('datos')).controls[cual].value['idPuesto']);

    this._usuarios.devolverUsuarios().subscribe(data => {
      data.forEach(usuario => {
        if (usuario['tipo']=="alumno")
        //mejor no usar un foreach porque éste recorre todos los elementos y hay que parar en cuanto se encuentre el primero
          for (let i=0; i<usuario['inscrito'].length; i++)
            if (usuario['inscrito'][i].idPuesto===this.codPuestoSolicitado){
              i=usuario['inscrito'].length;  //para salir del bucle del usuario actual y pasar al siguiente sin tener que buscar en todas las ofertas en las que ya se ha inscrito, dado que ya hemos encontrado la que nos interesaba
              if (this.llavesCandidatos.length===0) //Las llaves solo hay que guardarlas una vez. Son iguales para todos los usuarios
                Object.keys (usuario['datosPersonales']).forEach (llave=>{
                  this.llavesCandidatos.push (llave)
                });
              this.valoresCandidatos.push (Object.values (usuario['datosPersonales']));
            }
      });
    });
  }

  cancelarCandidatos(){
    this.numOferta=-1;
  }

  seleccionar(cual){
    this.valoresCandidatosSeleccionados.push(this.valoresCandidatos[cual]);
    this.valoresCandidatos.splice(cual,1);
  }

  descartar(cual){
    this.valoresCandidatosDescartados.push(this.valoresCandidatos[cual]);
    this.valoresCandidatos.splice(cual,1);
  }

  guardarCambios(){
    this.usuario_actual['ofertas']=[];
    this.formulario.controls['datos'].value.forEach(valor=>{
        this.usuario_actual['ofertas'].push(valor);
    });
    this._usuarios
      .actualizarUsuario(this.usuario_actual)
      .subscribe(user => {  //hay que suscribirse para que funcione (por cómo funciona el http de angular)
        console.log ('user');
    });
  }

  editarElemento (elemento){
    this.editandoCampo=true;
    this.numElementoEnEdicion=elemento;
    ((<FormArray>this.formulario.get('datos')).controls[elemento]).enable();
  }
}
