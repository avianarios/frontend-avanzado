import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
@Injectable()
export class UsuariosService {
  alumnos: any[] = [];
 base_url: string = 'http://mybackend.com/api/';
 alumnos_endpoint = 'alumnos';
 constructor(private http: HttpClient) {}

  devolverUsuarios() {
    return this.http.get<any>(this.base_url+this.alumnos_endpoint);
  }

  actualizarUsuario(update){
    return this.http.put(this.base_url + this.alumnos_endpoint, update);
  }
  //Gets all tasks
   getTasks() {
   return this.http.get<any>(this.base_url + this.alumnos_endpoint);
   } //getTasks
  //Creates a task
   createTask(task) {
   return this.http.post(this.base_url + this.alumnos_endpoint, task);
   } //createTask
  //Updates a Task
   updateTask(update) {
   console.log (update);
   return this.http.put(this.base_url + this.alumnos_endpoint, update);
   } //updateTask
  //Deletes a Task
   deleteTask(taskId) {
   return this.http.delete(`${this.base_url + this.alumnos_endpoint}/${taskId}`);
   } //deleteTask
  }
