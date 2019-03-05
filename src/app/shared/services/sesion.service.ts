import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  usuario:string;
  sesionIniciada:boolean;

  constructor() {
    this.sesionIniciada=false;
  }

  iniciarSesion(usuario:string){
    this.sesionIniciada=true;
    this.usuario=usuario;
  }

  cerrarSesion(){
    this.sesionIniciada=false;
  }

  sesionEstaIniciada(){
    return (this.sesionIniciada);
  }

  usuarioSesion(){
    return (this.usuario);
  }
}
