import { Component, ViewChild, OnInit} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { cadenaLimpia, formatoFecha, formatoPasaporte, formatoNIF, formatoNIE, noSoloNumeros } from '../../../shared/validadores';
import { UsuariosService } from '../../../shared/services/usuarios.service';
import { SesionService } from '../../../shared/services/sesion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.scss']
})
export class AlumnoComponent implements OnInit {
  numElementoEnEdicion:number;
  elementoEnEdicion:number;

  usuarios: any[]=[];
  alumno_actual: any[]=[];

  listaProvincias=['Almería', 'Cádiz', 'Córdoba', 'Granada', 'Jaén', 'Huelva', 'Málaga', 'Sevilla'];

  tipoDocumentos=['NIF', 'Pasaporte', 'NIE'];

  formDatosPersonales: FormGroup;
  formDatosFormacion: FormGroup;
  formDatosExperiencia: FormGroup;
  formDatosIdiomas: FormGroup;

  editandoCampo:boolean=false;
  editandoPersonales:boolean=false;
  editandoFormacion:boolean=false;
  editandoExperiencia:boolean=false;
  editandoIdiomas:boolean=false;

  llavesDatosPersonales: any []=[];
  valoresDatosPersonales: any []=[];
  llavesDatosFormacion: any []=[];
  valoresDatosFormacion: any []=[];
  llavesDatosExperiencia: any []=[];
  valoresDatosExperiencia: any []=[];
  llavesDatosIdiomas: any []=[];
  valoresDatosIdiomas: any []=[];
  items: any []=[];

  constructor(private _builder: FormBuilder, private _usuarios: UsuariosService, private _sesion: SesionService, private _router: Router) { }

  ngOnInit() {

    this.crearFormularios();
    this.crearValidadores();
    this._usuarios.devolverUsuarios().subscribe(data => {
        data.forEach(alumno => {
  //CAMBIAR POR EL DE ABAJO        if (alumno.correo===this._sesion.usuarioSesion()){
          if (alumno['identificacion'].usuario==='avm'){
            this.alumno_actual=alumno;
//              this.datosPersonales=alumno['datosPersonales'];

/*              this.llavesDatosPersonales=(Object.keys(alumno['datosPersonales']));
              this.valoresDatosPersonales=(Object.values(alumno['datosPersonales']));*/

              this.llavesDatosFormacion=Object.keys(this.alumno_actual['formacion']['0']);
              this.alumno_actual['formacion'].forEach(dato=>{
                this.valoresDatosFormacion.push(Object.values(dato));
              });

              this.llavesDatosExperiencia=Object.keys(this.alumno_actual['experiencia']['0']);
              this.alumno_actual['experiencia'].forEach(dato=>{
                this.valoresDatosExperiencia.push(Object.values(dato));
              });

              this.llavesDatosIdiomas=Object.keys(this.alumno_actual['idiomas']['0']);
              this.alumno_actual['idiomas'].forEach(dato=>{
                this.valoresDatosIdiomas.push(Object.values(dato));
              });

              this.rellenaFormularios();
              this.terminarEdicion("todos");
              this.escucharCambios();
//              this.borrarFormacion(0);
            }
          });
        });
  }

  crearFormularios(){
    this.formDatosPersonales= this._builder.group({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3), cadenaLimpia]),
      apellidos: new FormControl('', [Validators.required, Validators.minLength(3), cadenaLimpia]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      nacimiento: new FormControl('', formatoFecha),
      telefono: new FormControl('', noSoloNumeros),
      telefonoAlt: new FormControl('', noSoloNumeros),
      tipoDocumento: new FormControl(''),
      numeroDocumento: new FormControl(''),
      direccion: new FormControl(''),
      provincia: new FormControl(''),
      municipio: new FormControl(''),
      mas: new FormControl(''),
      competencias: new FormControl(''),
      conducir: new FormControl('')
    });

//hay que crear el formulario para que no de error el navegador al renderizar el html, pero aún no han llegado los datos, por lo que se inserta una fila vacía (que habrá que borrar)
    this.formDatosFormacion= this._builder.group({
      datosTitulo: new FormArray([])
      //      datosTitulo: this._builder.array([this.crearTitulo(undefined)])
    });


    this.formDatosExperiencia= this._builder.group({
      datosExperiencia: new FormArray([])
    });

    this.formDatosIdiomas= this._builder.group({
      datosIdiomas: new FormArray([])
    });

/*CÓMO AÑADIR UN SOLO CAMPO Y DESHABILITARLO
    this.formDatosFormacion = new FormGroup({
          datosTitulo: new FormArray([])
        });

/*        const nivel = new FormControl('', Validators.required);
        (<FormArray>this.formDatosFormacion2.get('datosTitulo')).push(nivel);
        (<FormArray>this.formDatosFormacion2.get('datosTitulo')).controls[0].setValue('adios');


    (<FormArray>this.formDatosFormacion2.get('datosTitulo'))
      .controls
      .forEach(control => {
        control.disable();
      })*/

/*FIN*/


  }

  rellenaFormularios(){
      /*rellena el formulario de datos personales*/
      for (let llave in this.alumno_actual['datosPersonales']){
        if (llave in (this.formDatosPersonales.controls))  //puede que hubiera campos en la BBDD que no se mostrasen por pantalla
          this.formDatosPersonales.controls[llave].setValue(this.alumno_actual['datosPersonales'][llave]);
      }
      /*rellena el formulario de datos de formación*/
      this.anyadirElemento ("formacion", this.alumno_actual['formacion']);
      this.anyadirElemento ("experiencia", this.alumno_actual['experiencia']);
      this.anyadirElemento ("idioma", this.alumno_actual['idiomas']);
  }

  anyadirElemento(tipo, matriz){
    switch (tipo){
      case "formacion":
        if  (matriz===undefined)
        (this.formDatosFormacion.controls['datosTitulo'] as FormArray).push(this.crearTitulo(["", "", "", "", ""]));
        else
        if ((Object.keys (matriz)[0])==="0"){ //si la primera llave es un número es porque se le ha pasado una matriz con más de un título donde cada fila es un título
          for (let i=0; i<matriz.length; i++)
            (this.formDatosFormacion.controls['datosTitulo'] as FormArray).push(this.crearTitulo(matriz[i]));
        }else  //solo se le ha pasado un título
          (this.formDatosFormacion.controls['datosTitulo'] as FormArray).push(this.crearTitulo(matriz));
        break;
      case "experiencia":
        if  (matriz===undefined)
        (this.formDatosExperiencia.controls['datosExperiencia'] as FormArray).push(this.crearExperiencia(["", "", "", "", ""]));
        else
        if ((Object.keys (matriz)[0])==="0"){ //si la primera llave es un número es porque se le ha pasado una matriz con más de un título donde cada fila es un título
          for (let i=0; i<matriz.length; i++)
            (this.formDatosExperiencia.controls['datosExperiencia'] as FormArray).push(this.crearExperiencia(matriz[i]));
        }else  //solo se le ha pasado un título
          (this.formDatosExperiencia.controls['datosExperiencia'] as FormArray).push(this.crearExperiencia(matriz));
        break;
      case "idioma":
        if  (matriz===undefined)
        (this.formDatosIdiomas.controls['datosIdiomas'] as FormArray).push(this.crearIdioma(["", "", "", "", ""]));
        else
        if ((Object.keys (matriz)[0])==="0"){ //si la primera llave es un número es porque se le ha pasado una matriz con más de un título donde cada fila es un título
          for (let i=0; i<matriz.length; i++)
            (this.formDatosIdiomas.controls['datosIdiomas'] as FormArray).push(this.crearIdioma(matriz[i]));
        }else  //solo se le ha pasado un título
          (this.formDatosIdiomas.controls['datosIdiomas'] as FormArray).push(this.crearIdioma(matriz));
        break;

      default:
        break;
    }

  }

  crearTitulo(datosTitulo){
      if (datosTitulo.nivel===undefined){
        this.numElementoEnEdicion=((<FormArray>this.formDatosFormacion.controls['datosTitulo']).controls.length);
        this.editandoFormacion=true;
        this.editandoCampo=true;
      }
      return this._builder.group({
        nivel: [datosTitulo.nivel],
        titulo: [datosTitulo.titulo],
        centro: [datosTitulo.centro],
        fecha: [datosTitulo.fecha],
        certificado: [datosTitulo.certificado]
      })
  }

  crearExperiencia(datosExperiencia){
    if (datosExperiencia.nivel===undefined){
      this.numElementoEnEdicion=((<FormArray>this.formDatosExperiencia.controls['datosExperiencia']).controls.length);
      this.editandoExperiencia=true;
      this.editandoCampo=true;
    }
    return this._builder.group({
      empresa: [datosExperiencia.empresa],
      cargo: [datosExperiencia.cargo],
      fecha: [datosExperiencia.fecha]
    });
  }

  crearIdioma(datosIdioma){
    if (datosIdioma.nivel===undefined){
      this.numElementoEnEdicion=((<FormArray>this.formDatosIdiomas.controls['datosIdiomas']).controls.length);
      this.editandoIdiomas=true;
      this.editandoCampo=true;
    }
    return this._builder.group({
      nivel: [datosIdioma.nivel],
      nombre: [datosIdioma.nombre],
      fecha: [datosIdioma.fecha]
    });
  }


/*  guardarFormacion(){
    this.editandoFormacion=false;
    //    this.tituloAnyadido=true;
    /*console.log (this.formDatosFormacionAntiguo.controls);
    Object.keys (this.formDatosFormacionAntiguo.controls).forEach ( aux=>{
    console.log (this.formDatosFormacionAntiguo.controls[aux].value);
  });
  this.valoresDatosFormacion.push([this.formDatosFormacionAntiguo.get('nivel').value, this.formDatosFormacionAntiguo.get('titulo').value, this.formDatosFormacionAntiguo.get('centro').value, this.formDatosFormacionAntiguo.get('fecha').value, this.formDatosFormacionAntiguo.get('certificado').value]);
  this.llavesDatosFormacion.forEach( aux=> {
    this.formDatosFormacionAntiguo.controls[aux].setValue('');
  });
}*/

  borrarFormacion(cual){
    console.log (this.formDatosFormacion.controls);
    (this.formDatosFormacion.controls['datosTitulo'] as FormArray).removeAt(cual);
  }

  terminarEdicion(cual){
    this.editandoCampo=false;
    switch (cual){
      case "personales":
        this.editandoPersonales=false;
        this.formDatosPersonales.disable();
/*        Object.keys(this.formDatosPersonales.controls).forEach(campo=>{
          this.formDatosPersonales.controls[campo].disable();
        });*/
        break;
      case "formacion":
        this.editandoFormacion=false;
        this.numElementoEnEdicion=-1;
        this.formDatosFormacion.disable();
/*        (<FormArray>this.formDatosFormacion.get('datosTitulo'))
          .controls
          .forEach(control => {
            control.disable();
          });*/
        break;
      case "experiencia":
          this.editandoExperiencia=false;
          this.numElementoEnEdicion=-1;
          this.formDatosExperiencia.disable();
        break;
      case "idiomas":
          this.editandoIdiomas=false;
          this.numElementoEnEdicion=-1;
          this.formDatosIdiomas.disable();
        break;
      default:
          this.terminarEdicion("personales");
          this.terminarEdicion("formacion");
          this.terminarEdicion("experiencia");
          this.terminarEdicion("idiomas");
        break;
    }
  }

editarCampo (form, elemento){
  this.editandoCampo=true;
  switch (form){
    case "personales":
      this.editandoPersonales=true;
      this.formDatosPersonales.enable();
  /*    Object.keys(this.formDatosPersonales.controls).forEach(campo=>{
        this.formDatosPersonales.controls[campo].enable();
      });*/
      break;
    case "formacion":
      this.numElementoEnEdicion=elemento;
      this.editandoFormacion=true;
  /*    (<FormArray>this.formDatosFormacion.get('datosTitulo'))
        .controls
        .forEach(control => {
          control.enable();
        });
        ((<FormArray>this.formDatosFormacion.get('datosTitulo')).controls[elemento]).disable();*/
        ((<FormArray>this.formDatosFormacion.get('datosTitulo')).controls[elemento]).enable();
        //this.formDatosFormacion.disable();
      break;
    case "experiencia":
      this.editandoExperiencia=true;
      this.numElementoEnEdicion=elemento;
      ((<FormArray>this.formDatosExperiencia.get('datosExperiencia')).controls[elemento]).enable();
      break;
    case "idiomas":
      this.editandoIdiomas=true;
      this.numElementoEnEdicion=elemento;
      ((<FormArray>this.formDatosIdiomas.get('datosIdiomas')).controls[elemento]).enable();
      break;
  }
}

  ir(donde){
    this._router.navigateByUrl(donde);
  }

/*  guardarCambios(){
    this.editandoPersonales=false;
  }*/

  escucharCambios(){
    this.formDatosPersonales.valueChanges.subscribe( campo => {
      this.alumno_actual['datosPersonales'] = Object.assign(this.alumno_actual['datosPersonales'], campo);
    });
  }

  crearValidadores(): void {
    this.formDatosPersonales.get('tipoDocumento').valueChanges.subscribe(
    (result) => {
        switch (result){
          case "Pasaporte":
            this.formDatosPersonales.get('numeroDocumento').setValidators([Validators.required, formatoPasaporte]);
            break;
          case "NIF":
            this.formDatosPersonales.get('numeroDocumento').setValidators([Validators.required, formatoNIF]);
            break;
          case "NIE":
            this.formDatosPersonales.get('numeroDocumento').setValidators([Validators.required, formatoNIE]);
            break;
        }
    }
   );
  }
}
