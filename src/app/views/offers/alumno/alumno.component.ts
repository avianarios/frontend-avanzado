import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../shared/services/usuarios.service';
import { SesionService } from '../../../shared/services/sesion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumno-offers',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.scss']
})
export class AlumnoComponent implements OnInit {
  usuario_actual: any[]=[];
//  llavesOfertas: Array<any>=[];
  valoresOfertasResumidas: Array<any>=[];
  valoresOfertasAmpliadas: Array<any>=[];
//  tmp: Array<any>=[];
  detalleOferta:boolean=false;
  numOferta:number=-1;
  codPuestoSolicitado:string='';
  valoresOfertasInscritas: Array<any>=[];

  constructor(private _usuarios: UsuariosService, private _sesion: SesionService, private _router: Router) { }

  ngOnInit() {
/*    if (!this._sesion.sesionEstaIniciada())
      this._router.navigateByUrl('/signin');
    else{*/
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
                    this.valoresOfertasAmpliadas.push([oferta.idPuesto, usuario.generales.nombre, oferta.puesto, oferta.fecha, oferta.provincia, oferta.municipio, oferta.descripcion, oferta.familia, oferta.titulos]);
                    this.valoresOfertasResumidas.push([oferta.idPuesto, usuario.generales.nombre, oferta.puesto, oferta.fecha, oferta.provincia]);
                  }
                }
            });
          }
        });
      });
  //  }
//  console.log (this.valoresOfertasInscritas.length);
  }

  solicitarEmpleo(cual){
    this.valoresOfertasInscritas.push(this.valoresOfertasAmpliadas[cual]);
    this.valoresOfertasAmpliadas.splice(cual, 1);
    this.valoresOfertasResumidas.splice(cual, 1);
    this.codPuestoSolicitado='';
  }

  cancelarSolicitudEmpleo(cual){
    this.valoresOfertasAmpliadas.push(this.valoresOfertasInscritas[cual]);
    this.valoresOfertasResumidas.push([
      this.valoresOfertasInscritas[cual][0], this.valoresOfertasInscritas[cual][1], this.valoresOfertasInscritas[cual][2], this.valoresOfertasInscritas[cual][3], this.valoresOfertasInscritas[cual][4]]);
    this.valoresOfertasInscritas.splice(cual, 1);
  }

  mostrarDetalle(cual){
    if (cual!==''){
      this.numOferta=cual;
      this.codPuestoSolicitado=this.valoresOfertasResumidas[cual][0];
    }else
      this.codPuestoSolicitado=cual;
  }

  ir(donde){
    this._router.navigateByUrl(donde);
  }
}
