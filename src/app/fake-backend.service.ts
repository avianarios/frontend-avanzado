import {InMemoryDbService} from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FakeBackendService implements InMemoryDbService{
    createDb(){
      let  alumnos =  [
        {  id:  1,  nombre:  'Blas', apellidos: 'Bombín' },
        {  id:  2,  nombre:  'Serafín', apellidos: 'Serafón' },
        {  id:  3,  nombre:  'Pipo', apellidos: 'Pufo' }
      ];
      return {alumnos:alumnos};
    }
}
