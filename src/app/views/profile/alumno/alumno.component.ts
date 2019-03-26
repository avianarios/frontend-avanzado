import { Component, OnInit} from '@angular/core';
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

  constructor(private _usuarios: UsuariosService, private _sesion: SesionService, private _router: Router) { }

  ngOnInit() {
    if (!this._sesion.sesionEstaIniciada())
      this._router.navigateByUrl('/signin');
    else{
        this.usuario_actual=this._sesion.usuarioSesion();

        this.llavesPersonales.push(Object.keys (this.usuario_actual['datosPersonales']));
        Object.values (this.usuario_actual['datosPersonales']).forEach (dato=>{
          this.valoresPersonales.push (dato);
        });

        this.cargarDatos(this.llavesFormacion, this.valoresFormacion, 'formacion');
        this.cargarDatos(this.llavesExperiencia, this.valoresExperiencia, 'experiencia');
        this.cargarDatos(this.llavesIdiomas, this.valoresIdiomas, 'idiomas');
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
}
