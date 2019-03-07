import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from '../../shared/services/sesion.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sesionIniciada:boolean;

  constructor(private _router:Router, private _sesion: SesionService) { }

  ngOnInit() {
    if (!(this.sesionIniciada=this._sesion.sesionEstaIniciada()))
//      this.mensaje="Sesión no iniciada";
      this._router.navigateByUrl('/signin');
  }

  ir(donde){
    this._router.navigateByUrl(donde);
  }
}