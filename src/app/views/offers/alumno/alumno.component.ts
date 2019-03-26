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
  valoresOfertasResumidas: Array<any>=[];
  valoresOfertasAmpliadas: Array<any>=[];
  detalleOferta:boolean=false;
  numOferta:number=-1;
  codPuestoSolicitado:string='';
  valoresOfertasInscritas: Array<any>=[];

  constructor(private _usuarios: UsuariosService, private _sesion: SesionService, private _router: Router) { }

  ngOnInit() {
    if (!this._sesion.sesionEstaIniciada())
      this._router.navigateByUrl('/signin');
    else{
      this.usuario_actual=this._sesion.usuarioSesion();
      this._usuarios.devolverUsuarios().subscribe(data => {
          data.forEach(usuario => {

            if (usuario.tipo==='empresa'){
              usuario['ofertas'].forEach(oferta=>{
                //compruebo si el usuario no está inscrito ya en esa oferta
                let tamanyo=this.usuario_actual['inscrito'].length;
                let i=0;
                for (i=0; i<tamanyo && this.usuario_actual['inscrito'][i].idPuesto!==oferta.idPuesto ; i++);  //usando for en vez de foreach podemos ahorrar iteraciones cuando la oferta se encuentra pronto.
                if (i<tamanyo)  //si salió del bucle antes de recorrer entera la matriz, es que el alumno estaba inscrito ya en esa oferta
                  this.valoresOfertasInscritas.push([oferta.idPuesto, usuario['generales'].nombre, oferta.puesto, oferta.provincia, oferta.municipio, oferta.familia, oferta.descripcion, oferta.familia, oferta.titulos]);
                else  //Si el usuario no está inscrito
                //compruebo si ese usuario tiene el título necesario para trabajar en la oferta actual
                  for (let i=0, encontrado=0; i<this.usuario_actual['formacion'].length && !encontrado; i++)
                    if ((this.usuario_actual['formacion'][i].familia)===oferta.familia){
                      encontrado=1;
                      this.valoresOfertasAmpliadas.push([oferta.idPuesto, usuario.generales.nombre, oferta.puesto, oferta.fecha, oferta.provincia, oferta.municipio, oferta.descripcion, oferta.familia, oferta.titulos]);
                      this.valoresOfertasResumidas.push([oferta.idPuesto, usuario.generales.nombre, oferta.puesto, oferta.fecha, oferta.provincia]);
                  }
            });
          }
        });
      });
    }
  }

  solicitarEmpleo(cual){
    this.valoresOfertasInscritas.push(this.valoresOfertasAmpliadas[cual]);
    this.codPuestoSolicitado='';
    this.usuario_actual['inscrito'].push({idPuesto: this.valoresOfertasAmpliadas[cual][0], fecha: this.valoresOfertasAmpliadas[cual][3]});
    this.valoresOfertasAmpliadas.splice(cual, 1);
    this.valoresOfertasResumidas.splice(cual, 1);
    this.guardarCambios();
  }

  cancelarSolicitudEmpleo(cual){
    this.valoresOfertasAmpliadas.push(this.valoresOfertasInscritas[cual]);
    this.valoresOfertasResumidas.push([
        this.valoresOfertasInscritas[cual][0], this.valoresOfertasInscritas[cual][1], this.valoresOfertasInscritas[cual][2], this.valoresOfertasInscritas[cual][3], this.valoresOfertasInscritas[cual][4]]);
    this.valoresOfertasInscritas.splice(cual, 1);
    this.usuario_actual['inscrito'].splice(cual, 1);
    this.guardarCambios();
  }

  mostrarDetalle(cual){
    if (cual!==''){
      this.numOferta=cual;
      this.codPuestoSolicitado=this.valoresOfertasResumidas[cual][0];
    }else
      this.codPuestoSolicitado=cual;
  }

  guardarCambios(){
    this._usuarios.actualizarUsuario(this.usuario_actual);
  }
}
