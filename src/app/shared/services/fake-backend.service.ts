/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})*/

import {InMemoryDbService} from 'angular-in-memory-web-api';
export class FakeBackendService implements InMemoryDbService{
    createDb(){

let  usuarios =  [
        {
          id:1,
          tipo: 'alumno',
          identificacion: {
            usuario: 'avm',
            clave: 'avm'
          },
          datosPersonales: {
            nombre: 'Antonio Jesús',
            apellidos: 'Vázquez Muñoz',
            correo: 'asdf@asdf.es',
            nacimiento: '01/10/1978',
            telefono: '958958958',
            conducir: 'A, B',
            NIF: '1234567a',
            mas: 'esto es un texto sobre mí',
            otras: 'estas son mis competencias'
          },
          formacion: [
              {
                nivel: 'Ciclo formativo',
                titulo: 'Desarrollo de aplicaciones web',
                centro: 'IES Salduba',
                fecha: '15/07/2018',
                certificado: 'no'
              },
              {
                nivel: 'Ciclo formativo',
                titulo: 'Administracion de sistemas informaticos y redes',
                centro: 'IES Pedro Espinosa',
                fecha: '15/07/2018',
                certificado: 'si'
              }
            ],
          experiencia: [
              {
                empresa: 'Suma',
                cargo: 'Junior',
                fecha: '15/07/2018'
              },
              {
                empresa: 'Indra',
                cargo: 'engineer',
                fecha: '15/07/2018'
              }
            ],
          idiomas: [
              {
                nivel: 'B2',
                nombre: 'Inglés',
                fecha: '15/07/2018'
              },
              {
                nivel: 'B2',
                nombre: 'Francés',
                fecha: '15/07/2018'
              }
            ],

          offers: {
            entities: [
              {
                cargo: 'Professor Extraescolars programació i robòtica educativa',
                empresa: 'Eixos Creativa',
                familia: 'Informática y Comunicaciones',
                fecha: '30/01/2019'
              },
              {
                cargo: 'Programaador Jr Java',
                empresa: 'Ki - Works',
                familia: 'Informática y Comunicaciones',
                fecha: '28/01/2019'
              },
              {
                cargo: 'Programador.net',
                empresa: 'Tecnic Consultores',
                familia: 'Informática y Comunicaciones',
                fecha: '28/01/2019'
              },
              {
                cargo: 'Programador Junior Java Spring boot',
                empresa: 'GRUPO CMC',
                familia: 'Informática y Comunicaciones',
                fecha: '25/01/2019'
              },
              {
                cargo: 'Administrativa',
                empresa: 'Servium',
                familia: 'Administración y Gestión',
                fecha: '25/01/2019'
              },
              {
                cargo: 'DESARROLLADOR/A SOFTWARE',
                empresa: 'PEPPER',
                familia: 'Informática y Comunicaciones',
                fecha: '23/01/2019'
              }
            ]
          }
        },
        {
        id: 2,
        tipo: 'alumno',
        identificacion: {
          usuario: 'dpp',
          clave: 'dpp'
        },
        datosPersonales: {
          nombre: 'Don Pimpón',
          apellidos: 'pimponero',
          correo: 'dp@dp.es',
          nacimiento: '01/10/1978',
          telefono: '958958958',
          conducir: 'A, B',
          NIF: '1234567a',
          mas: 'esto es un texto sobre mí',
          otras: 'estas son mis competencias'
        },
        formacion: [
            {
              nivel: 'Ciclo formativo',
              titulo: 'Desarrollo de aplicaciones web',
              centro: 'IES Politécnico Jesús Marin',
              fecha: '15/07/2018',
              certificado: 'no'
            },
            {
              nivel: 'Ciclo formativo',
              titulo: 'Administracion de sistemas informaticos y redes',
              centro: 'IES Politécnico Jesús Marin',
              fecha: '15/07/2018',
              certificado: 'si'
            }
          ],
          experiencia: [
              {
                empresa: 'Suma',
                cargo: 'Junior',
                fecha: '15/07/2018'
              },
              {
                empresa: 'Indra',
                cargo: 'engineer',
                fecha: '15/07/2018'
              }
            ],

          idiomas: [
              {
                nivel: 'C1',
                nombre: 'Inglés',
                fecha: '15/07/2018'
              },
              {
                nivel: 'A2',
                nombre: 'Francés',
                fecha: '15/07/2018'
              }
            ],

          offers: {
            entities: [
              {
                cargo: 'Professor Extraescolars programació i robòtica educativa',
                empresa: 'Eixos Creativa',
                familia: 'Informática y Comunicaciones',
                fecha: '30/01/2019'
              },
              {
                cargo: 'Programaador Jr Java',
                empresa: 'Ki - Works',
                familia: 'Informática y Comunicaciones',
                fecha: '28/01/2019'
              },
              {
                cargo: 'Programador.net',
                empresa: 'Tecnic Consultores',
                familia: 'Informática y Comunicaciones',
                fecha: '28/01/2019'
              },
              {
                cargo: 'Programador Junior Java Spring boot',
                empresa: 'GRUPO CMC',
                familia: 'Informática y Comunicaciones',
                fecha: '25/01/2019'
              },
              {
                cargo: 'Administrativa',
                empresa: 'Servium',
                familia: 'Administración y Gestión',
                fecha: '25/01/2019'
              },
              {
                cargo: 'DESARROLLADOR/A SOFTWARE',
                empresa: 'PEPPER',
                familia: 'Informática y Comunicaciones',
                fecha: '23/01/2019'
              }
            ]
          }
        },

        {
          id:3,
          tipo: 'empresa',
          identificacion: {
            usuario:'acme',
            clave:'acme'
          },
          generales: {
            nombre: 'Prefabricados acme',
            razon: 'ACME SL',
            cif: '1234a',
            direccion: 'calle pez nº2',
            provincia: 'granada',
            municipio: 'granada',
            url: 'www.acme.es'
          },
          contacto: {
            nombre: 'gonzalo',
            apellidos: 'gonzález de la gonzalera',
            correo: 'jgg@acme.es'
          }
        },
        {
          id:4,
          tipo: 'empresa',
          identificacion: {
            usuario:'puleva',
            clave:'puleva'
          },
          generales: {
            nombre: 'Puleva',
            razon: 'puleva foods',
            cif: '5678b',
            direccion: 'calle tiburón nº2',
            provincia: 'granada',
            municipio: 'granada',
            url: 'www.puleva.es'
          },
          contacto: {
            nombre: 'chiquito',
            apellidos: 'de la calzada',
            correo: 'chiquitodelacalzada@pecador.es'
          }
        },



      ];

      return {usuarios:usuarios};
    }
}


/*import { InMemoryDbService } from 'angular-in-memory-web-api';
export class FakeBackendService implements InMemoryDbService {
 createDb() {
  let tasks = [
   {
     id: 1,
     description: "Buy Groceries"
   },
   {
     id: 2,
     description: "Paint the garage"
   }
  ];
  return {
   tasks: tasks
  };
 }
}
*/
