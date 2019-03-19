import { Component, OnInit} from '@angular/core';
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
  usuario_actual: Array<any>=[];
  llavesPersonales: Array<any>=[];
  llavesFormacion: Array<any>=[];
  llavesExperiencia: Array<any>=[];
  llavesIdiomas: Array<any>=[];

  valoresPersonales: Array<any>=[];
  valoresFormacion: Array<any>=[];
  valoresExperiencia: Array<any>=[];
  valoresIdiomas: Array<any>=[];


  listaProvincias=['Almería', 'Cádiz', 'Córdoba', 'Granada', 'Jaén', 'Huelva', 'Málaga', 'Sevilla'];
  tipoDocumentos=['NIF', 'Pasaporte', 'NIE'];


  constructor(private _builder: FormBuilder, private _usuarios: UsuariosService, private _sesion: SesionService, private _router: Router) { }

  ngOnInit() {
/*    if (!this._sesion.sesionEstaIniciada())
      this._router.navigateByUrl('/signin');
    else{*/
      this._usuarios.devolverUsuarios().subscribe(grupoUsuarios=> {
console.log (grupoUsuarios);
        for (let i=0; i<grupoUsuarios.length; i++)
//        data.forEach(usuario=> {    Mejor usar for para salir del bucle en cuanto encuentre al usuario y no tener que recorrerlos todos
/*          if (this._sesion.usuarioSesion().id===grupoUsuarios[i]['identificacion'].usuario){
            this.usuario_actual=grupoUsuarios[i];*/
            this.usuario_actual=grupoUsuarios[0];



            this.llavesPersonales.push(Object.keys (this.usuario_actual['datosPersonales']));
            Object.values (this.usuario_actual['datosPersonales']).forEach (dato=>{
              this.valoresPersonales.push (dato);
            });

console.log ("aún en alumno component", this.usuario_actual);

            this.llavesFormacion.push(Object.keys (this.usuario_actual['formacion'][0]));
            this.usuario_actual['formacion'].forEach (datos=>{
              this.valoresFormacion.push (Object.values(datos));
            });

            this.llavesExperiencia.push(Object.keys (this.usuario_actual['experiencia'][0]));
            this.usuario_actual['experiencia'].forEach (datos=>{
              this.valoresExperiencia.push (Object.values(datos));
            });

            this.llavesIdiomas.push(Object.keys (this.usuario_actual['idiomas'][0]));
            this.usuario_actual['idiomas'].forEach (datos=>{
              this.valoresIdiomas.push (Object.values(datos));
            });

//          }
        });
//      }
  }

  devolverUsuarioActual(){
    return this.usuario_actual;
  }


}
