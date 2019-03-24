import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UsuariosService } from '../../../../shared/services/usuarios.service';
import { SesionService } from '../../../../shared/services/sesion.service';
import { AlumnoService } from '../alumno.service';
import { Router } from '@angular/router';
import { formatoFecha } from '../../../../shared/validadores';

@Component({
  selector: 'app-formacion',
  templateUrl: './formacion.component.html',
  styleUrls: ['./formacion.component.scss']
})
export class FormacionComponent implements OnInit {
  formulario: FormGroup;
  usuario_actual: Array<any>=[];
  seccion_actual: Array<any>=[];
  llaves: Array<any>=[];
  valores:Array<any>=[];
  numElementoEnEdicion:number;
  editandoElemento:boolean=false;
  creandoElemento:boolean=false;
  tipoTitulo=["Ciclo formativo", "Título universitario"];
  nivelUniversidad=["Grado", "Diplomatura", "Licenciatura", "Maestría", "Doctorado"];
  matrizInstitutos=["IES El saladillo", "IES Pino montano", "IES Aguadulce", "IES Los alcores", "IES Salduba", "IES Pedro Espinosa", "IES Francisco de Burgos"];
  familiasFP=[];
  titulosFP=[];

/*  familiasProfesionalesFP=[
    {nombre: "Informática y comunicaciones", titulos: ["redes", "montaje"]},
    {nombre: "Instalación y mantenimiento", titulos:["electricista", "fontanero"]},
    {nombre: "Imagen y sonido", titulos:["técnico de sonido", "técnico de cámara"]}
  ]*/
  matrizTitulos: Array<any>=[];
  matrizNivelesEducativos: Array<any>=[];

  familiaActual: object;
  nivelActual: object;
  titulosActuales: object;

  familiasProfesionalesFP=[
    {nombre: "Informática y comunicaciones", ciclos: [
      { grado: "Superior", titulos: [
          "Seleccione uno",
          "Técnico Superior en Desarrollo de aplicaciones web",
          "Técnico Superior en Desarrollo de aplicaciones multiplataforma",
          "Técnico Superior en Administración de sistemas informáticos en red"
        ]
      },
      { grado: "Medio", titulos: [
          "Seleccione uno",
          "Técnico en sistemas microinformáticos y redes"
        ]
      },
      { grado: "Básico", titulos: [
          "Seleccione uno",
          "Título profesional básico en Informática de oficina",
          "Título profesional básico en Informática y comunicaciones"
        ]
      }
    ]},


    {nombre: "Actividades físicas y deportivas", ciclos: [
      { grado: "Superior", titulos: [
          "Seleccione uno",
          "Técnico Superior en Acondicionamiento Físico",
          "Técnico Superior en Enseñanza y Animación Sociodeportiva"
        ]
      },
      { grado: "Medio", titulos: [
          "Seleccione uno",
          "Técnico en Actividades Ecuestres"
        ]
      },
      { grado: "Básico", titulos: [
          "Seleccione uno",
          "Título Profesional Básico en Acceso y Conservación en Instalaciones Deportivas"
        ]
      }
    ]},


    {nombre: "Imagen y sonido", ciclos: [
      { grado: "Superior", titulos: [
          "Seleccione uno",
          "Curso de especialización en Audiodescripcion y Subtitulación",
          "Técnico Superior en Enseñanza y Animación Sociodeportiva"
        ]
      },
      { grado: "Medio", titulos: [
          "Seleccione uno",
          "Técnico Superior en Sonido para Audiovisuales y Espectáculos",
          "Técnico Superior en Realización de Proyectos Audiovisuales y Espectáculos",
          "Técnico Superior en Producción de Audiovisuales y Espectáculos",
          "Técnico Superior en Iluminación, Captación y Tratamiento de Imagen",
          "Técnico Superior en Animaciones 3D, Juegos y Entornos Interactivos"
        ]
      },
      { grado: "Básico", titulos: [
          "Seleccione uno",
          "Técnico en Vídeo Disc-Jockey y Sonido"
        ]
      }
    ]}

  ];

  constructor(
    private _builder: FormBuilder,
    private _usuarios: UsuariosService,
    private _sesion: SesionService,
    private _alumno: AlumnoService,
    private _router: Router
  ){}

  ngOnInit() {
    this.crearFormulario();
    if (!this._sesion.sesionEstaIniciada())
      this._router.navigateByUrl('/signin');
    else{
      this.usuario_actual=this._sesion.usuarioSesion();
      this.seccion_actual=this.usuario_actual['formacion'];
      this.cargarDatos(this.llaves, this.valores, 'formacion');
    }
  }

  cargarDatos(llaves, valores, cual){
    llaves.push(Object.keys (this.usuario_actual[cual][0]));
    this.usuario_actual[cual].forEach (datos=>{
      valores.push (Object.values(datos));
    });
  }

  atras(){
    this.editandoElemento=false;
    this.creandoElemento=false;
  }

   crearFormulario(){
    this.formulario=this._builder.group({
     tipo: new FormControl(''),
     familia: new FormControl('', Validators.required),
     centro: new FormControl(''),
     nivel: new FormControl('', Validators.required),
     titulo: new FormControl('', Validators.required),
     fecha: new FormControl('', formatoFecha),
     dual: new FormControl(''),
     bilingüe: new FormControl(''),
     certificado: new FormControl('')
   });
  }

  rellenarFormulario(numElemento){
      this.formulario.controls['tipo'].setValue(this.seccion_actual[numElemento].tipo);
      this.formulario.controls['familia'].setValue(this.seccion_actual[numElemento].familia);
      this.formulario.controls['centro'].setValue(this.seccion_actual[numElemento].centro);
      this.formulario.controls['nivel'].setValue(this.seccion_actual[numElemento].nivel);
      this.formulario.controls['titulo'].setValue(this.seccion_actual[numElemento].titulo);
      this.formulario.controls['fecha'].setValue(this.seccion_actual[numElemento].fecha);
      this.formulario.controls['dual'].setValue(this.seccion_actual[numElemento].dual);
      this.formulario.controls['bilingüe'].setValue(this.seccion_actual[numElemento].bilingüe);
      this.formulario.controls['certificado'].setValue(this.seccion_actual[numElemento].certificado);
      this.nivelActual=this.seccion_actual[numElemento].nivel;
  }

  siFamiliaCambia(event:any){
    this.matrizNivelesEducativos=[];
    this.matrizTitulos=[];
    this.familiaActual=event.target.value;
    this.cargarMatrizNiveles(this.familiaActual);
  }

  siNivelCambia(event:any){
    this.matrizTitulos=[];
    this.nivelActual=event.target.value;
    this.cargarMatrizTitulos(this.nivelActual);
  }

  cargarMatrizNiveles(familia){
    this.familiaActual=this.familiasProfesionalesFP.find(i=>i.nombre==familia);
    Object.values(this.familiaActual['ciclos']).forEach(value=>{
      this.matrizNivelesEducativos.push(value['grado']);
    });
    this.cargarMatrizTitulos(this.nivelActual);
  }

  cargarMatrizTitulos(nivel){
    this.matrizTitulos=[];
    this.titulosActuales=this.familiaActual['ciclos'].find(i=>i.grado==nivel)
    Object.values (this.titulosActuales['titulos']).forEach (valor=>{
      this.matrizTitulos.push(valor);
    });
  }

  terminarEdicion(){
      this.guardarCambios();
      this.llaves=[];
      this.valores=[];
      this.cargarDatos(this.llaves, this.valores, 'formacion');
      this.editandoElemento=false;
      this.creandoElemento=false;
  }

  nuevoElemento(){
    this.editandoElemento=false;
    this.creandoElemento=true;
  }

  borrarElemento(posicion){
    this.usuario_actual['formacion'].splice(posicion,1);
    this._usuarios
      .actualizarUsuario(this.usuario_actual)
      .subscribe(user => {  //hay que suscribirse para que funcione (por cómo funciona el http de angular)
        console.log ('');
    });
    //Mejora: refrescar el componente actual en vez de volver
    this._router.navigateByUrl('/profile/alumno');
  }

  guardarCambios(){
    const aux={
      tipo: this.formulario.controls['tipo'].value,
      familia: this.formulario.controls['familia'].value,
      centro: this.formulario.controls['centro'].value,
      nivel: this.formulario.controls['nivel'].value,
      titulo: this.formulario.controls['titulo'].value,
      fecha: this.formulario.controls['fecha'].value,
      dual: this.formulario.controls['dual'].value,
      bilingüe: this.formulario.controls['bilingüe'].value,
      certificado: this.formulario.controls['certificado'].value,
    };
    this.usuario_actual['formacion'].splice(this.numElementoEnEdicion, 0, aux);
    this._usuarios
      .actualizarUsuario(this.usuario_actual)
      .subscribe(user => {  //hay que suscribirse para que funcione (por cómo funciona el http de angular)
        console.log ('');
    });
    this._router.navigateByUrl('/profile/alumno');
  }

  editarElemento (posicionElemento){
    this.editandoElemento=true;
    //cargo la matriz familiasFP con los datos del objeto familiasProfesionalesFP para que lo lea el select
    (Object.values (this.familiasProfesionalesFP)).forEach (valor=>{
      this.familiasFP.push(valor.nombre);
    });
    this.numElementoEnEdicion=posicionElemento;
    this.rellenarFormulario(posicionElemento);
    this.seccion_actual.splice(posicionElemento,1);
    this.cargarMatrizNiveles(this.seccion_actual[posicionElemento].familia);
    this.cargarMatrizTitulos(this.seccion_actual[posicionElemento].nivel);
  }
}
