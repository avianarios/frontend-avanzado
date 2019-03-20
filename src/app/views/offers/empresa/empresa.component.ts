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
  llavesOfertas: Array<any>=[];
  valoresOfertas: Array<any>=[];
  numOferta: number=-1;
  codPuestoSolicitado:string;
  //tengo que dividir a los candidatos en dos matrices, llaves y valores, porque ngfor solo puede iterar por matrices y no por objetos
  llavesCandidatos: Array<any>=[];
    valoresCandidatos: Array<any>=[];
  formOferta: FormGroup;
  numElementoEnEdicion:number;
  editandoOferta:boolean=false;
  editandoCampo:boolean=false;
  editandoPersonales:boolean=false;
  valoresCandidatosSeleccionados: Array<any>=[];
  valoresCandidatosDescartados: Array<any>=[];

  constructor( private _builder: FormBuilder, private _usuarios: UsuariosService, private _sesion: SesionService, private _router: Router) { }

  ngOnInit() {
    this.crearFormularios();
    if (!this._sesion.sesionEstaIniciada())
      this._router.navigateByUrl('/signin');
    else{
      this.usuario_actual=this._sesion.usuarioSesion();
          this.usuario_actual['ofertas'].forEach (oferta=>{
            if (this.llavesOfertas.length===0)   //Las llaves solo hay que guardarlas una vez. Son iguales para todas las ofertas
              Object.keys (oferta).forEach (llave =>{
                this.llavesOfertas.push (llave);
              });
            this.valoresOfertas.push (Object.values (oferta));
        });
        this.rellenaFormularios();
        this.terminarEdicion('ofertas');
      }
  }

  crearFormularios(){
    this.formOferta= this._builder.group({
      datos: new FormArray([])
    });
  }

  rellenaFormularios(){
    this.anyadirElemento ("ofertas", this.usuario_actual['ofertas']);
  }

    anyadirElemento(tipo, matriz){
      if  (matriz===undefined)
        (this.formOferta.controls['datos'] as FormArray).push(this.crearOferta(["", "", "", "", ""]));
      else
        if ((Object.keys (matriz)[0])==="0"){ //si la primera llave es un número es porque se le ha pasado una matriz con más de un título donde cada fila es un título
          for (let i=0; i<matriz.length; i++)
            (this.formOferta.controls['datos'] as FormArray).push(this.crearOferta(matriz[i]));
        }else  //solo se le ha pasado un título
          (this.formOferta.controls['datos'] as FormArray).push(this.crearOferta(matriz));
    }


    crearOferta(datosOferta){
        if (datosOferta.nivel===undefined){
          this.numElementoEnEdicion=((<FormArray>this.formOferta.controls['datos']).controls.length);
          this.editandoOferta=true;
          this.editandoCampo=true;
        }
        return this._builder.group({
          idPuesto: [datosOferta.idPuesto],
          puesto: [datosOferta.puesto],
          familia: [datosOferta.familia],
          fecha: [datosOferta.fecha],
          descripcion: [datosOferta.descripcion],
          provincia: [datosOferta.provincia],
          municipio: [datosOferta.municipio],
          titulos: [datosOferta.titulos]
        })
    }

    borrar(form, posicion){
      (form.controls['datos'] as FormArray).removeAt(posicion);
      this.valoresOfertas.splice(posicion, 1);
      console.log (this.formOferta);
    }

    terminarEdicion(cual){
      this.editandoOferta=false;
      this.editandoCampo=false;
      this.formOferta.disable();
    }


    editarCampo (form, elemento){
      this.editandoCampo=true;
      this.editandoOferta=true;
      ((<FormArray>this.formOferta.get('datos')).controls[elemento]).enable();
      this.numElementoEnEdicion=elemento;
    }

  gestionarCandidatos(cual){
    this.valoresCandidatos=[];
    this.numOferta=cual;
    this.codPuestoSolicitado=((<FormArray>this.formOferta.get('datos')).controls[cual].value['idPuesto']);

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

  irAtras() {
    this.numOferta=-1;
  }

  ir(donde){
    this.numOferta=-1;
    this._router.navigateByUrl(donde);
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

  }
}
