import { Router } from '@angular/router';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { MatTableDataSource } from '@angular/material';
//import { DataSource } from '@angular/cdk/table';


@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.scss']
})
export class ProfileStudentComponent {
  columnasFormacion: string[] = ['tipo', 'nivel', 'titulo', 'centro', 'categoria', 'fecha', 'certificado', 'bilingue', 'dual', 'acciones'];
  datosFormacion;

  columnasIdiomas: string[] = ['nivel', 'idioma', 'fecha', 'acciones'];
  datosIdiomas;

  aux:Array<any>=[];
  columnasPersonales: string[] = ['correo', 'nacimiento', 'telefono', 'NIF', 'conducir', 'direccion' ,'sobreMi', 'competencias'];
  datosPersonales;


  ngOnInit(){
  this.aux.push ({
    'correo': this.user['email'],
    'nacimiento': this.user['birthdate'],
    'telefono': this.user['phone'],
    'NIF': this.user['documentNumber'],
    'conducir': this.user['license'],
    'direccion': this.user['address'],
    'sobreMi': this.user['aboutMe'],
    'competencias': this.user['otherCompetences']
  });
  this.datosPersonales=new MatTableDataSource(this.aux);
  this.datosFormacion = new MatTableDataSource(this.user.studies);
  this.datosIdiomas = new MatTableDataSource(this.user.languages);
}

  @Input() user: User;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onDeleteStudy: EventEmitter<User> = new EventEmitter();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onDeleteLanguage: EventEmitter<User> = new EventEmitter();


  constructor(private _router: Router) {}

  deleteStudy(studyID: number) {
    const studies = [...this.user.studies];
    const index = studies.findIndex(study => study.uid === studyID);
    if (index === -1) {
      alert('Error: Study not found');
      return;
    }
    studies.splice(index, 1);
    const user = {
      ...this.user,
      studies
    };
    this.onDeleteStudy.emit(user);
    this.datosFormacion=user.studies;
  }

  deleteLanguage(languageID: any) {
    const languages = [...this.user.languages];
    const index = languages.findIndex(language => language.uid === languageID);
    if (index === -1) {
      alert('Error: Language not found');
      return;
    }
    languages.splice(index, 1);
    const user = {
      ...this.user,
      languages
    };
    this.onDeleteLanguage.emit(user);
    this.datosIdiomas=user.languages;
  }

  editarFormacion(ID_formacion: number){
    this._router.navigate(['/admin/profile/profile-student/study', ID_formacion]);
  }

  editarIdioma(ID_idioma: number){
    this._router.navigate(['/admin/profile/profile-student/language', ID_idioma])
  }
}
