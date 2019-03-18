import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { cadenaLimpia, formatoFecha, formatoPasaporte, formatoNIF, formatoNIE, noSoloNumeros } from '../../../../shared/validadores';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { SesionService } from '../../../../shared/services/sesion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personales',
  templateUrl: './personales.component.html',
  styleUrls: ['./personales.component.scss']
})
export class PersonalesComponent implements OnInit {
  formulario: FormGroup;
  usuario_actual: Array<any>=[];
  seccion_actual: Array<any>=[];
  numElementoEnEdicion:number;
  editandoFormulario:boolean=false;
  listaProvincias=['Almería', 'Cádiz', 'Córdoba', 'Granada', 'Jaén', 'Huelva', 'Málaga', 'Sevilla'];
  tipoDocumentos=['NIF', 'Pasaporte', 'NIE'];

  constructor(
    private _builder: FormBuilder,
    private _usuarios: UsuariosService,
    private _sesion: SesionService,
    private _router: Router
  ){}

  ngOnInit() {
    this.crearFormulario();
/*    if (!this._sesion.sesionEstaIniciada())
      this._router.navigateByUrl('/signin');
    else{*/
      this.crearValidadores();
      this._usuarios.devolverUsuarios().subscribe(grupoUsuarios=> {
        for (let i=0; i<grupoUsuarios.length; i++)
//          if (this._sesion.usuarioSesion().id===grupoUsuarios[i]['identificacion'].usuario){

//            this.usuario_actual=grupoUsuarios[i];
  this.usuario_actual=grupoUsuarios[0];
            this.seccion_actual=this.usuario_actual['datosPersonales'];
            this.rellenarFormulario();
//            this.terminarEdicion();
            this.editandoFormulario=true;
//          }
});
//}
  }


    crearFormulario(){
      this.formulario= this._builder.group({
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
    }

    rellenarFormulario(){
      for (let llave in this.usuario_actual['datosPersonales'])
        if (llave in (this.formulario.controls))  //puede que hubiera campos en la BBDD que no se mostrasen por pantalla
          this.formulario.controls[llave].setValue(this.usuario_actual['datosPersonales'][llave]);
    }


      terminarEdicion(){
          this.numElementoEnEdicion=-1;
          this.editandoFormulario=false;
          this.formulario.disable();
      }

      borrar(form, elemento){
        (form.controls['datos'] as FormArray).removeAt(elemento);
      }

      guardarCambios(){
        this.seccion_actual=this.formulario.value;
        this._usuarios.actualizarUsuario(this.usuario_actual);
      }

      editarFormulario (){
        this.editandoFormulario=true;
      }

      crearValidadores(): void {
        this.formulario.get('tipoDocumento').valueChanges.subscribe(
        (result) => {
            switch (result){
              case "Pasaporte":
                this.formulario.get('numeroDocumento').setValidators([Validators.required, formatoPasaporte]);
                break;
              case "NIF":
                this.formulario.get('numeroDocumento').setValidators([Validators.required, formatoNIF]);
                break;
              case "NIE":
                this.formulario.get('numeroDocumento').setValidators([Validators.required, formatoNIE]);
                break;
            }
        }
       );
      }
}
