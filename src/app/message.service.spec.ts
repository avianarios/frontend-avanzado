//import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MessageService} from "./message.service";



describe('MessageService', () => {
  let service: MessageService;
  let longitud;
  let cadenaPrueba="prueba"

  beforeEach(() => {
    service=new MessageService();
    longitud=service.messages.length;
    console.log (longitud);
  });

/*  afterEach(() => {
    longitud=service.messages.length;
  });*/


  it("Añadir un elemento a la matriz de mensajes", function() {
    service.add(cadenaPrueba);
    expect(service.messages.length).toBeGreaterThan(longitud);

    //Se saca el elemento introducido para no contaminar la matriz. Las pruebas deben ser inocuas
    service.messages.pop();
    expect(service.messages.length).toEqual(longitud);
  });

  it("Comprobar que el último elemento sea el introducido", function() {
    service.add(cadenaPrueba);
    let elemento=service.messages.pop();
    expect(elemento).toEqual(cadenaPrueba);
  });


  it ('Borrar el contenido de la matriz de mensajes si no está vacía' ,()=>{
    service.add(cadenaPrueba);
    if (service.messages.length > 0){
      service.clear();
      expect(service.messages.length).toEqual(0);
    }
  });

  it ('Borrar el contenido de la matriz de mensajes si está vacía' ,()=>{
    if (longitud == 0){
      service.clear();
      expect(service.messages.length).toEqual(0);
    }
  });


});




/*import { TestBed, inject } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService]
    });
  });

  it('should be created', inject([MessageService], (service: MessageService) => {
    expect(service).toBeTruthy();
  }));
});
*/


//expect(service.messages).toContain("hola");

/*var a = ["foo", "bar", "baz"];

expect(a).toContain("bar");
expect(a).not.toContain("quux");*/
