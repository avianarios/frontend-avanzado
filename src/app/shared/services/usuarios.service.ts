import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
@Injectable()
export class UsuariosService {
// usuarios: any[] = [];
 base_url: string = 'http://mybackend.com/api/';
 usuarios_endpoint = 'usuarios';
 constructor(private http: HttpClient) {}

  devolverUsuarios() {
    return this.http.get<any>(this.base_url+this.usuarios_endpoint);
  }

  actualizarUsuario(update){
    return this.http.put(this.base_url + this.usuarios_endpoint, update);
  }
  //Gets all tasks
   getTasks() {
   return this.http.get<any>(this.base_url + this.usuarios_endpoint);
   } //getTasks
  //Creates a task
   createTask(task) {
   return this.http.post(this.base_url + this.usuarios_endpoint, task);
   } //createTask
  //Updates a Task
   updateTask(update) {
   console.log (update);
   return this.http.put(this.base_url + this.usuarios_endpoint, update);
   } //updateTask
  //Deletes a Task
   deleteTask(taskId) {
   return this.http.delete(`${this.base_url + this.usuarios_endpoint}/${taskId}`);
   } //deleteTask
  }
