import { Component, ViewChild, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
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
  usuario_actual: any[]=[];
  listaProvincias=['Almería', 'Cádiz', 'Córdoba', 'Granada', 'Jaén', 'Huelva', 'Málaga', 'Sevilla'];
  formDatosGenerales: FormGroup;

  constructor(private _builder: FormBuilder, private _usuarios: UsuariosService, private _sesion: SesionService, private _router: Router) { }

  ngOnInit() {
    this.formDatosGenerales= this._builder.group({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255), sinEspacios]),
      razon: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255), sinEspacios]),
      cif: new FormControl(''),
      direccion: new FormControl(''),
      provincia: new FormControl(''),
      municipio: new FormControl(''),
      url: new FormControl(''),
      nombre_contacto: new FormControl(''),
      apellidos_contacto: new FormControl(''),
      telefono: new FormControl('', noSoloNumeros),
      correo: new FormControl('', Validators.email)
    });

    this._usuarios.devolverUsuarios().subscribe(data => {
//      this.usuarios=data;
      data.forEach(elemento=> {
//        if (alumno.correo===this._sesion.usuarioSesion()){
        if (elemento['identificacion'].usuario==='acme')
          this.usuario_actual=elemento;
        this.rellenaFormularios();
      });
    });
  }


  rellenaFormularios(){
    for (let llave in this.usuario_actual['generales']){
    console.log (llave);
        this.formDatosGenerales.controls[llave].setValue(this.usuario_actual['generales'][llave]);
      }

/*      this.anyadirElemento ("formacion", this.alumno_actual['formacion']);
      this.anyadirElemento ("experiencia", this.alumno_actual['experiencia']);
      this.anyadirElemento ("idioma", this.alumno_actual['idiomas']);*/
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
}

  cancelarEdicion(){
    Object.keys(this.formDatosPersonales.controls).forEach(campo=>{
      this.formDatosPersonales.controls[campo].disable();
    });
  }

  ir(donde){
    this._router.navigateByUrl(donde);
  }*/
}
