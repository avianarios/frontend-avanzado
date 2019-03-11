import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../shared/services/usuarios.service';
import { SesionService } from '../../../shared/services/sesion.service';
import { Router } from '@angular/router';

import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-alumno-offers',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.scss']
})
export class AlumnoComponent implements OnInit {
  usuario_actual: any[]=[];
//  llavesOfertas: Array<any>=[];
  ofertasResumidas: Array<any>=[];
  ofertasAmpliadas: Array<any>=[];
//  tmp: Array<any>=[];
  detalleOferta:boolean=false;
  numOferta:number=-1;

  constructor(private _usuarios: UsuariosService, private _sesion: SesionService, private _router: Router) { }

  ngOnInit() {
    if (!this._sesion.sesionEstaIniciada())
      this._router.navigateByUrl('/signin');
    else{
      this._usuarios.devolverUsuarios().subscribe(data => {
          data.forEach(usuario => {
            if (usuario['identificacion'].usuario==='avm')
              this.usuario_actual=usuario;
            if (usuario.tipo==='empresa'){
              //obtengo los títulos las columnas de la tabla
//              if (this.llavesOfertas.length===0){
//                this.llavesOfertas.push ("empresa");
/*                Object.keys (usuario['ofertas'][0]).forEach (campo=>{
                  this.llavesOfertas.push (campo);
                });*/
              //}
              usuario['ofertas'].forEach(oferta=>{
                //compruebo si ese usuario tiene el título necesario para trabajar en la oferta actual
                for (let i=0, encontrado=0; i<this.usuario_actual['formacion'].length && !encontrado; i++){
                  if ((this.usuario_actual['formacion'][i].familia)===oferta.familia){
                    encontrado=1;
//Meto todos los campos
/*                    Object.values (oferta).forEach (campo=>{
                      this.tmp.push (campo);
                    });*/
//                    this.datosOfertas.push(this.tmp);
                    this.ofertasResumidas.push([usuario.generales.nombre, oferta.puesto, oferta.familia, oferta.fecha, oferta.provincia]);
                    this.ofertasAmpliadas.push([usuario.generales.nombre, oferta.puesto, oferta.descripcion, oferta.provincia, oferta.municipio, oferta.familia, oferta.titulos]);
                  }
                }
            });
          }
        });
      });
    }
  }

  solicitarEmpleo(cual){
    console.log ("voy a solicitar la oferta", cual);
  }

  mostrarDetalle(cual){
    this.detalleOferta=true;
    this.numOferta=cual;
  }
}
