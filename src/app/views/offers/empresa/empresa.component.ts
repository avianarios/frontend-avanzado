import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../shared/services/usuarios.service';
import { SesionService } from '../../../shared/services/sesion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresa-offers',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {
  usuario_actual:Array<any>=[];
  llavesOfertas: Array<any>=[];
  valoresOfertas: Array<any>=[];
  numOferta: number=-1;
  codPuestoSolicitado:string;
  //tengo que dividir a los candidatos en dos matrices, llaves y valores, porque ngfor solo puede iterar por matrices y no por objetos
  llavesCandidatos: Array<any>=[];
  valoresCandidatos: Array<any>=[];

  constructor(private _usuarios: UsuariosService, private _sesion: SesionService, private _router: Router) { }

  ngOnInit() {
    /*    if (!this._sesion.sesionEstaIniciada())
          this._router.navigateByUrl('/signin');
        else{*/
        this._usuarios.devolverUsuarios().subscribe(data => {
            data.forEach(usuario => {
              if (usuario['identificacion'].usuario==='acme'){
                this.usuario_actual=usuario;
                usuario['ofertas'].forEach (oferta=>{
                    if (this.llavesOfertas.length===0)   //Las llaves solo hay que guardarlas una vez. Son iguales para todas las ofertas
                      Object.keys (oferta).forEach (llave =>{
                        this.llavesOfertas.push (llave);
                      });
                    this.valoresOfertas.push (Object.values (oferta));
                })
              }
            });
          });
  }

  mostrarDetalle(cual){
    this.numOferta=cual;

    console.log (this.numOferta);
    this.codPuestoSolicitado=this.valoresOfertas[cual][0];
    this._usuarios.devolverUsuarios().subscribe(data => {
      data.forEach(usuario => {
        if (usuario['tipo']=="alumno")
        //mejor no usar un foreach porque éste recorre todos los elementos y hay que parar en cuanto se encuentre el primero
          for (let i=0; i<usuario['inscrito'].length; i++)
            if (usuario['inscrito'][i].idPuesto===this.codPuestoSolicitado){
              i=usuario['inscrito'].length;  //para salir del bucle del usuario actual y pasar al siguiente sin tener que buscar en todas las ofertas en las que ya se ha inscrito, dado que ya hemos encontrado la que nos interesaba
              if (this.llavesCandidatos.length===0) //Las llaves solo hay que guardarlas una vez. Son iguales para todos los usuarios
                Object.keys (usuario['datosPersonales']).forEach (llave=>{
                  this.llavesCandidatos.push (llave)
                });
              this.valoresCandidatos.push (Object.values (usuario['datosPersonales']));
console.log (this.llavesCandidatos, this.valoresCandidatos)              ;

            }
/*            usuario['inscrito'].forEach( oferta=>{
            console.log ("está inscrito a", oferta);
          });*/
          console.log (this.candidatos);
      });
    });

//    console.log (this.numOferta, this.valoresOfertas[cual]);
  }

}
