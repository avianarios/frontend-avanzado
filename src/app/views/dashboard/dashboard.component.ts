import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from '../../shared/services/sesion.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private _router:Router, private _sesion: SesionService) { }

  ngOnInit() {
    if (!this._sesion.sesionEstaIniciada())
      this._router.navigateByUrl('/signin');
/*let kk=(this._sesion.usuarioSesion());
console.log (kk['identificacion'].usuario);*/
  }

  cerrarSesion(){
    this._sesion.cerrarSesion();
    this._router.navigateByUrl('/signin');
  }
}
