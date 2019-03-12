import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { sinEspacios, noSoloNumeros } from '../../../shared/validadores';
import { UsuariosService } from '../../../shared/services/usuarios.service';
import { SesionService } from '../../../shared/services/sesion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {
  usuario_actual: Array<any>=[];
  listaProvincias=['Almería', 'Cádiz', 'Córdoba', 'Granada', 'Jaén', 'Huelva', 'Málaga', 'Sevilla'];
  formDatosGenerales: FormGroup;
  editandoEmpresa:boolean=false;

  constructor(private _builder: FormBuilder, private _usuarios: UsuariosService, private _sesion: SesionService, private _router: Router) { }

  ngOnInit() {
    if (!this._sesion.sesionEstaIniciada())
      this._router.navigateByUrl('/signin');
    else{
      this.crearFormularios();
      this._usuarios.devolverUsuarios().subscribe(grupoUsuarios => {
        for (let i=0; i<grupoUsuarios.length; i++)
//        data.forEach(usuario=> {    Mejor usar for para salir del bucle en cuanto encuentre al usuario y no tener que recorrerlos todos
          if (this._sesion.usuarioSesion().id===grupoUsuarios[i]['identificacion'].usuario){
            this.usuario_actual=grupoUsuarios[i];
            this.rellenaFormularios();
            this.terminarEdicion();
            i=grupoUsuarios.length; //sale del bucle en cuanto encuentre al usuario, ahorrando iteraciones inútiles
          }
//        });
      });
    }
  }

  crearFormularios(){
    this.formDatosGenerales= this._builder.group({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255), sinEspacios]),
      razon: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255), sinEspacios]),
      cif: new FormControl(''),
      direccion: new FormControl(''),
      provincia: new FormControl(''),
      municipio: new FormControl(''),
      url: new FormControl(''),
      nombre_contacto: new FormControl(''),
      apellidos: new FormControl(''),
      telefono: new FormControl('', noSoloNumeros),
      correo: new FormControl('', Validators.email)
    });
  }

  rellenaFormularios(){
    for (let llave in this.usuario_actual['generales'])
        this.formDatosGenerales.controls[llave].setValue(this.usuario_actual['generales'][llave]);
  }

  editarCampo (){
    this.editandoEmpresa=true;
    this.formDatosGenerales.enable();
  }

  terminarEdicion(){
    this.editandoEmpresa=false;
    this.formDatosGenerales.disable();
  }

  ir(donde){
    this._router.navigateByUrl(donde);
  }

/*
  escucharCambios(){
    this.formDatosPersonales.valueChanges.subscribe( campo => {
      this.alumno_actual['datosPersonales'] = Object.assign(this.alumno_actual['datosPersonales'], campo);
      console.log (this.alumno_actual['datosPersonales']);
    });
  }

  guardarCambios(){
      this._usuarios.updateTask(this.alumno_actual);
  }

  editarForm(){
  //  this.editar=true;
    Object.keys(this.formDatosPersonales.controls).forEach(campo=>{
      this.formDatosPersonales.controls[campo].enable();
    });
}*/

}
