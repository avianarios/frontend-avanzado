import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  sesionIniciada:boolean;
  usuario= {id:"", tipo:""};

  constructor() {
    this.sesionIniciada=false;
  }

  iniciarSesion(usuario:string, tipo_usuario:string){
    this.sesionIniciada=true;
    this.usuario.id=usuario;
    this.usuario.tipo=tipo_usuario;
  }

  cerrarSesion(){
    this.sesionIniciada=false;
    this.usuario= {id:"", tipo:""};
  }

  sesionEstaIniciada(){
    return (this.sesionIniciada);
  }

  usuarioSesion(){
    return (this.usuario);
  }
}
