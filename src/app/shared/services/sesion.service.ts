import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  usuario:string;
  sesionIniciada:boolean;
  tipo_usuario:string;

  constructor() {
    this.sesionIniciada=false;
  }

  iniciarSesion(usuario:string, tipo_usuario:string){
    this.sesionIniciada=true;
    this.usuario=usuario;
    this.tipo_usuario=tipo_usuario;
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

  tipoUsuario(){
    return (this.tipo_usuario);
  }
}
