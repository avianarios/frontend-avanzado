import { Component, OnInit} from '@angular/core';
import { UsuariosService } from '../../../shared/services/usuarios.service';
import { SesionService } from '../../../shared/services/sesion.service';
import { AlumnoService } from './alumno.service';
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

  hayFormacion:boolean=true;
  hayIdiomas:boolean=true;
  hayExperiencia:boolean=true;


  listaProvincias=['Almería', 'Cádiz', 'Córdoba', 'Granada', 'Jaén', 'Huelva', 'Málaga', 'Sevilla'];
  tipoDocumentos=['NIF', 'Pasaporte', 'NIE'];


  constructor(private _usuarios: UsuariosService, private _alumno: AlumnoService, private _sesion: SesionService, private _router: Router) { }

  ngOnInit() {
    if (!this._sesion.sesionEstaIniciada())
      this._router.navigateByUrl('/signin');
    else{
        this.usuario_actual=this._sesion.usuarioSesion();

        this.llavesPersonales.push(Object.keys (this.usuario_actual['datosPersonales']));
        Object.values (this.usuario_actual['datosPersonales']).forEach (dato=>{
          this.valoresPersonales.push (dato);
        });

        this.hayFormacion=this._alumno.consultarVariable('formacion');
        if (this.hayFormacion===true){
          this.llavesFormacion.push(Object.keys (this.usuario_actual['formacion'][0]));
          this.usuario_actual['formacion'].forEach (datos=>{

            this.valoresFormacion.push (Object.values(datos));
          });
        }else
          this.hayFormacion=false;

        this.hayExperiencia=this._alumno.consultarVariable('experiencia');
        if (this.hayExperiencia===true){
          this.llavesExperiencia.push(Object.keys (this.usuario_actual['experiencia'][0]));
          this.usuario_actual['experiencia'].forEach (datos=>{
            this.valoresExperiencia.push (Object.values(datos));
          });
        }else
          this.hayExperiencia=false;

        this.hayIdiomas=this._alumno.consultarVariable('idiomas');
        if (this.hayIdiomas===true){
          this.llavesIdiomas.push(Object.keys (this.usuario_actual['idiomas'][0]));
          this.usuario_actual['idiomas'].forEach (datos=>{
            this.valoresIdiomas.push (Object.values(datos));
          });
        }else
          this.hayIdiomas=false;
    }
  }
}
