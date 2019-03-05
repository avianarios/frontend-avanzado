import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../../shared/services/usuarios.service';
import { SesionService } from '../../../shared/services/sesion.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss']
})
export class ResumenComponent implements OnInit {
  editarPersonales:boolean=false;
  alumnoCompleto: any[] = [];


  llavesDatosPersonales: any []=[];
  valoresDatosPersonales: any []=[];
  llavesDatosFormacion: any []=[];
  valoresDatosFormacion: any []=[];
  llavesDatosExperiencia: any []=[];
  valoresDatosExperiencia: any []=[];
  llavesDatosIdiomas: any []=[];
  valoresDatosIdiomas: any []=[];
  //  valoresDatosFormacion: Array<any>;

  constructor(private _router:Router, private _usuarios: UsuariosService, private _sesion: SesionService) { }

  ngOnInit() {
    this._usuarios.devolverUsuarios().subscribe(data => {

        data.forEach(alumno => {
  //CAMBIAR POR EL DE ABAJO        if (alumno.correo===this._sesion.usuarioSesion()){
          if (alumno['identificacion'].usuario==='avm'){
//              this.datosPersonales=alumno['datosPersonales'];

              this.llavesDatosPersonales=(Object.keys(alumno['datosPersonales']));
              this.valoresDatosPersonales=(Object.values(alumno['datosPersonales']));

              this.llavesDatosFormacion=Object.keys(alumno['formacion']['0']);
              alumno['formacion'].forEach(dato=>{
                this.valoresDatosFormacion.push(Object.values(dato));
              });

              this.llavesDatosExperiencia=Object.keys(alumno['experiencia']['0']);
              alumno['experiencia'].forEach(dato=>{
                this.valoresDatosExperiencia.push(Object.values(dato));
              });

              this.llavesDatosIdiomas=Object.keys(alumno['idiomas']['0']);
              alumno['idiomas'].forEach(dato=>{
                this.valoresDatosIdiomas.push(Object.values(dato));
              });

            }
          });
        });
  }

  editarFormulario(){
    this.editarPersonales=true;
  }

  ir(donde){
    this._router.navigateByUrl(donde);
  }

}
