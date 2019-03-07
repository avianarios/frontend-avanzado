import { Component, ViewChild, OnInit } from '@angular/core';
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
  nivel: string;
  titulo :string;
  centro:string;
  fecha:string;
  certificado: string;

  usuarios: any[]=[];
  alumno_actual: any[]=[];

  listaProvincias=['Almería', 'Cádiz', 'Córdoba', 'Granada', 'Jaén', 'Huelva', 'Málaga', 'Sevilla'];

  tipoDocumentos=['NIF', 'Pasaporte', 'NIE'];

  formDatosPersonales: FormGroup;
  formDatosFormacionAntiguo: FormGroup;
  formDatosFormacion: FormGroup;

  editandoPersonales:boolean=false;
  editandoFormacion:boolean=false;
  llavesDatosPersonales: any []=[];
  valoresDatosPersonales: any []=[];
  llavesDatosFormacion: any []=[];
  valoresDatosFormacion: any []=[];
//  valoresDatosFormacion: Array<string>=[];
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


              for (let llave in this.alumno_actual['datosPersonales']){
                if (llave in (this.formDatosPersonales.controls))  //puede que hubiera campos en la BBDD que no se mostrasen por pantalla
                  this.formDatosPersonales.controls[llave].setValue(this.alumno_actual['datosPersonales'][llave]);
              }
              this.escucharCambios();
              this.anyadirFormacion(this.alumno_actual['formacion']);
              this.borrarFormacion(0);

//              this.anyadirFormacion(this.alumno_actual['formacion'][i].nivel, this.alumno_actual['formacion'][i].titulo, this.alumno_actual['formacion'][i].centro, this.alumno_actual['formacion'][i].fecha, this.alumno_actual['formacion'][i].certificado);

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

    this.formDatosFormacionAntiguo= this._builder.group({
      nivel: new FormControl(''),
      titulo: new FormControl(''),
      centro: new FormControl(''),
      fecha: new FormControl(''),
      certificado: new FormControl('')
    });

//hay que crear el formulario para que no de error el navegador al renderizar el html, pero aún no han llegado los datos, por lo que se inserta una fila vacía (que habrá que borrar)
    this.formDatosFormacion= this._builder.group({
      datosTitulo: this._builder.array([this.crearTitulo(undefined)])
    });
    this.cancelarEdicion();
  }

  guardarFormacion(){
    this.editandoFormacion=false;
    //    this.tituloAnyadido=true;
    /*console.log (this.formDatosFormacionAntiguo.controls);
    Object.keys (this.formDatosFormacionAntiguo.controls).forEach ( aux=>{
    console.log (this.formDatosFormacionAntiguo.controls[aux].value);
  });*/
  this.valoresDatosFormacion.push([this.formDatosFormacionAntiguo.get('nivel').value, this.formDatosFormacionAntiguo.get('titulo').value, this.formDatosFormacionAntiguo.get('centro').value, this.formDatosFormacionAntiguo.get('fecha').value, this.formDatosFormacionAntiguo.get('certificado').value]);

  this.llavesDatosFormacion.forEach( aux=> {
    this.formDatosFormacionAntiguo.controls[aux].setValue('');
  });
}

  anyadirFormacion(matriz){
      for (let i=0; i<matriz.length; i++)
        (this.formDatosFormacion.controls['datosTitulo'] as FormArray).push(this.crearTitulo(matriz[i]));
  }

  crearTitulo(datosTitulo){
    let nivel="";
    let titulo="";
    let centro="";
    let fecha="";
    let certificado="";
    if (typeof datosTitulo !== 'undefined'){
        nivel= datosTitulo.nivel;
        titulo= datosTitulo.titulo;
        centro= datosTitulo.centro;
        fecha= datosTitulo.fecha;
        certificado= datosTitulo.certificado;
    }

      return this._builder.group({
        nivel: [nivel],
        titulo: [titulo],
        centro: [centro],
        fecha: [fecha],
        certificado: [certificado]
      })
  }

  borrarFormacion(cual){
    (this.formDatosFormacion.controls['datosTitulo'] as FormArray).removeAt(cual);
  }

    submit() {
      console.log(this.formDatosFormacionAntiguo.value);
    }

  cancelarEdicion(){
    this.editandoPersonales=false;
    this.editandoFormacion=false;

    Object.keys(this.formDatosPersonales.controls).forEach(campo=>{
      this.formDatosPersonales.controls[campo].disable();
    });
/*****************************************/
let control = <FormArray>this.formDatosFormacion.controls.datosTitulo;
console.log (control.controls);
console.log (control.controls[0]);



/*
///esta sintaxis da error de compilación (aunque la ejecuta), pero la he usado antes sin error
//console.log (this.formDatosFormacion.controls.datosTitulo.controls);
//esta sintaxis no da error
console.log (this.formDatosFormacion.get('datosTitulo').controls);
Object.keys(this.formDatosFormacion.get('datosTitulo')['controls']).forEach(titulo=>{
//esto me debería dar acceso al primer elemento de la formación (el primer título), pero devuelve un formgroup con los valores de los campos vacíos
console.log (titulo);
  console.log (this.formDatosFormacion.get('datosTitulo')['controls'][0]);
/*  Object.keys (this.formDatosFormacion.controls['datosTitulo'].controls[titulo].controls).forEach(campo=>{
    console.log (campo);
    this.formDatosFormacion.controls['datosTitulo'].controls[titulo].controls[campo].disable();
  });
})
/*****************************************/

  }

  editarPersonales(){
    this.editandoPersonales=true;
    Object.keys(this.formDatosPersonales.controls).forEach(campo=>{
      this.formDatosPersonales.controls[campo].enable();
    });
  }

  editarFormacion(i){
    console.log ("editando"+i);
  }

  ir(donde){
    this._router.navigateByUrl(donde);
  }

  guardarCambios(){
    this.editandoPersonales=false;
  }

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
