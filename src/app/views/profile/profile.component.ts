import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { cadenaLimpia, formatoFecha, formatoPasaporte, formatoNIF, formatoNIE, noSoloNumeros } from '../../shared/validadores';
import { UsuariosService } from '../../shared/services/usuarios.service';
import { SesionService } from '../../shared/services/sesion.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  alumno: any[] = [];
  datosPersonales: any[]=[];
  formacion: any[]=[];
  experiencia: any[]=[];
  idiomas: any[]=[];

  listaProvincias=['Almería', 'Cádiz', 'Córdoba', 'Granada', 'Jaén', 'Huelva', 'Málaga', 'Sevilla'];

  editar:boolean=false;
  tipoDocumentos=['NIF', 'Pasaporte', 'NIE'];

  formDatosPersonales: FormGroup;
  formDatosFormacion: FormGroup;
  constructor(private _builder: FormBuilder, private _usuarios: UsuariosService, private _sesion: SesionService) { }

  ngOnInit() {
    /*for (const field in this.formDatosPersonales.controls) { // 'field' is a string
       const control = this.formDatosPersonales.get(field); // 'control' is a FormControl
       console.log (control);
    }*/
    this.formDatosPersonales= this._builder.group({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3), cadenaLimpia]),
      apellidos: new FormControl('', [Validators.required, Validators.minLength(3), cadenaLimpia]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      fechaNacimiento: new FormControl('', formatoFecha),
      telefono: new FormControl('', noSoloNumeros),
      telefonoAlt: new FormControl('', noSoloNumeros),
      tipoDocumento: new FormControl(''),
      numeroDocumento: new FormControl(''),
      direccion: new FormControl(''),
      provincia: new FormControl(''),
      municipio: new FormControl(''),
      sobreMi: new FormControl(''),
      otrasCompetencias: new FormControl(''),
      permisoConduccion: new FormControl('')
    });


    this.formDatosFormacion=this._builder.group({
        nivel: new FormControl(''),
        titulo: new FormControl(''),
        centro: new FormControl(''),
        fecha: new FormControl(''),
        certificado: new FormControl('')
    });

    this.crearValidador();
    Object.keys(this.formDatosPersonales.controls).forEach(campo=>{
      this.formDatosPersonales.controls[campo].disable();
    });

    this._usuarios.devolverUsuarios().subscribe(data => {
      data.forEach(alumno => {
//        if (alumno.correo===this._sesion.usuarioSesion()){
        if (alumno['identificacion'].correo==='asdf@asdf.es'){

          alumno['formacion'].forEach(forma=>{
            this.formacion.push(Object.values (forma));
          });

          for (let clave_alumno in alumno['datosPersonales']){
            if (clave_alumno in (this.formDatosPersonales.controls))  //puede que hubiera campos en la BBDD que no se mostrasen por pantalla
              this.formDatosPersonales.controls[clave_alumno].setValue(alumno['datosPersonales'][clave_alumno]);
          }
        }
      });
    });
  }


  guardar(){
    console.log (this.formDatosPersonales);
    console.log ("guardando");
    this.editar=false;
  }

  private crearValidador(): void {
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
    this.editar=true;
    Object.keys(this.formDatosPersonales.controls).forEach(campo=>{
      this.formDatosPersonales.controls[campo].enable();
    });
}


  cancelarEdicion(){
    Object.keys(this.formDatosPersonales.controls).forEach(campo=>{
      this.formDatosPersonales.controls[campo].disable();
    });
  }

}