import { Component, ViewChild, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { cadenaLimpia, formatoFecha, formatoPasaporte, formatoNIF, formatoNIE, noSoloNumeros } from '../../../shared/validadores';
import { UsuariosService } from '../../../shared/services/usuarios.service';
import { SesionService } from '../../../shared/services/sesion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  usuarios: any[]=[];
  alumno_actual: any[]=[];
  llavesDatosPersonales: any []=[];
  valoresDatosPersonales: any []=[];

  listaProvincias=['Almería', 'Cádiz', 'Córdoba', 'Granada', 'Jaén', 'Huelva', 'Málaga', 'Sevilla'];

  tipoDocumentos=['NIF', 'Pasaporte', 'NIE'];

  formDatosPersonales: FormGroup;
  formDatosFormacion: FormGroup;
  constructor(private _builder: FormBuilder, private _usuarios: UsuariosService, private _sesion: SesionService, private _router: Router) { }

  ngOnInit() {
    /*for (const field in this.formDatosPersonales.controls) { // 'field' is a string
       const control = this.formDatosPersonales.get(field); // 'control' is a FormControl
       console.log (control);
    }*/

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
    this.crearValidador();

    this._usuarios.devolverUsuarios().subscribe(data => {
      this.usuarios=data;
      data.forEach(alumno => {
//        if (alumno.correo===this._sesion.usuarioSesion()){
        if (alumno['identificacion'].usuario==='avm'){
/*          this.llavesDatosPersonales=(Object.keys(alumno['datosPersonales']));
          this.valoresDatosPersonales=(Object.values(alumno['datosPersonales']));
        }*/

          this.alumno_actual=alumno;
          for (let clave_alumno in alumno['datosPersonales']){
            if (clave_alumno in (this.formDatosPersonales.controls))  //puede que hubiera campos en la BBDD que no se mostrasen por pantalla
              this.formDatosPersonales.controls[clave_alumno].setValue(alumno['datosPersonales'][clave_alumno]);
          }
          this.escucharCambios();
        }
      });
    });
  }

  escucharCambios(){
    this.formDatosPersonales.valueChanges.subscribe( campo => {
      this.alumno_actual['datosPersonales'] = Object.assign(this.alumno_actual['datosPersonales'], campo);
      console.log (this.alumno_actual['datosPersonales']);
    });
  }

  guardarCambios(){
      this._usuarios.updateTask(this.alumno_actual);
  }

  crearValidador(): void {
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

  editarForm(){
  //  this.editar=true;
    Object.keys(this.formDatosPersonales.controls).forEach(campo=>{
      this.formDatosPersonales.controls[campo].enable();
    });
}

  cancelarEdicion(){
    Object.keys(this.formDatosPersonales.controls).forEach(campo=>{
      this.formDatosPersonales.controls[campo].disable();
    });
  }

  ir(donde){
    this._router.navigateByUrl(donde);
  }
}
