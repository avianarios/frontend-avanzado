import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'UOCJob';
}
/*

import { HttpClient } from '@angular/common/http';
import { UsuariosService } from './shared/services/usuarios.service';
import { Component, OnInit } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  tasks: any[] = [];
   myTask: string;
   taskEdit: string;
   editMode: boolean = false;
   loading: boolean = false;
 constructor(private _builder: FormBuilder, private _usuarios: UsuariosService) {}
 ngOnInit() {
  this.getAllTasks();


  } //ngOnInit


 getAllTasks() {
  this._usuarios.getTasks().subscribe(data => {
  this.tasks = data;
  });
  } //getAllTasks


 create() {
  this.loading = true;
  const postData = {
  description: this.myTask
  };
 this._usuarios.createTask(postData).subscribe(data => {
  this.loading = false;
  this.getAllTasks();
  this.myTask = "";
  });
  } //create


 edit(task) {
console.log (task) ;
  this.taskEdit = Object.assign({}, task);
  task.editing = true;
  this.editMode = true;
  } //edit

 saveEdit(task) {
  this._usuarios.updateTask(this.taskEdit).subscribe(data => {
  //task = data;
  this.getAllTasks();
  task.editing = false;
  this.editMode = false;
  });
  } //saveEdit


 delete(task) {
  console.log("Delete");
  this._usuarios.deleteTask(task.id).subscribe(data => {
  this.getAllTasks();
  });
  } //delete
 }
*/
