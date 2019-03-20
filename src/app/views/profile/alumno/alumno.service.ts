import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  hayFormacion:boolean=true;
  hayExperiencia:boolean=true;
  hayIdiomas:boolean=true;

  constructor(

  ) { }

  consultarVariable(cual):boolean{
    switch (cual){
      case "formacion":
        return this.hayFormacion;
        break;
      case "experiencia":
        return this.hayExperiencia;
        break;
      case "idiomas":
        return this.hayIdiomas;
        break;
    }
  }

  cambiarVariable(cual, estado){
    switch (cual){
      case "formacion":
        this.hayFormacion=estado;
//        this.hayFormacion=(estado=="true");
        break;
      case "experiencia":
        this.hayExperiencia=estado;
        break;
      case "idiomas":
        this.hayIdiomas=estado;
        break;
    }
/*    if (this.hayFormacion) console.log ("hay");
    else console.log ("no hay");*/
  }
}
