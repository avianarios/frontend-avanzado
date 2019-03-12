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
                familia: 'Informática y comunicaciones',
                certificado: 'no'
              },
              {
                nivel: 'Ciclo formativo',
                titulo: 'Administracion de sistemas informaticos y redes',
                centro: 'IES Pedro Espinosa',
                familia: 'Informática y comunicaciones',
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
                idioma: 'Inglés',
                nivel: 'B1',
                fecha: '15/07/2018'
              },
              {
                idioma: 'Francés',
                nivel: 'C2',
                fecha: '15/07/2018'
              }
            ],
            inscrito: [
              {
                idPuesto: 'p1',
                fecha: '28/01/2019'
              },
              {
                idPuesto: 'p2',
                fecha: '28/01/2019'
              },
              {
                idPuesto: 'p5',
                fecha: '28/01/2019'
              }
            ]
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
              familia: 'Informática y comunicaciones',
              fecha: '15/07/2018',
              certificado: 'no'
            },
            {
              nivel: 'Ciclo formativo',
              titulo: 'Administracion de sistemas informaticos y redes',
              centro: 'IES Politécnico Jesús Marin',
              familia: 'Informática y comunicaciones',
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
                idioma: 'Inglés',
                nivel: 'C1',
                fecha: '15/07/2018'
              },
              {
                idioma: 'Francés',
                nivel: 'A2',
                fecha: '15/07/2018'
              }
            ],

          inscrito: [
              {
                idPuesto: 'p1',
                fecha: '28/01/2019'
              },
              {
                idPuesto: 'p3',
                fecha: '28/01/2019'
              }
            ]
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
            url: 'www.acme.es',
            nombre_contacto: 'gonzalo',
            apellidos: 'gonzález de la gonzalera',
            telefono: '999999',
            correo: 'jgg@acme.es'
          },
          ofertas: [
            {
              idPuesto: 'p1',
              puesto: 'Profesor de patronaje',
              familia: 'Corte y confección',
              fecha: '30/01/2019',
              descripcion: 'Empresa líder en su sector busca gente joven para trabajar mucho',
              provincia: 'Granada',
              municipio: 'La Herradura',
              titulos: 'Técnico en costura, Técnico de grado básico en hilos y agujas'
            },
            {
              idPuesto: 'p2',
              puesto: 'Programador juvenil Java',
              familia: 'Informática y comunicaciones',
              fecha: '28/01/2019',
              descripcion: 'Empresa líder en su sector busca gente joven para trabajar mucho',
              provincia: 'Granada',
              municipio: 'Albuñuelas',
              titulos: 'Técnico de programación, Técnico de grado básico en tocateclas'
              },
            {
              idPuesto: 'p3',
              puesto: 'Programador.net',
              familia: 'Informática y comunicaciones',
              fecha: '28/01/2019',
              descripcion: 'Empresa líder en su sector busca gente joven para trabajar mucho',
              provincia: 'Granada',
              municipio: 'Salobreña',
              titulos: 'Técnico superior en jefatura de proyecto, Técnico de grado medio en programación'
            }
          ]
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
            nombre_contacto: 'chiquito',
            apellidos: 'de la calzada',
            telefono: '999999',
            correo: 'chiquitodelacalzada@pecador.es'
          },
          ofertas: [
            {
              idPuesto: 'p4',
              puesto: 'Programador Junior Java Spring boot',
              familia: 'Informática y comunicaciones',
              fecha: '25/01/2019',
              descripcion: 'Empresa líder en su sector busca gente joven para trabajar mucho',
              provincia: 'Málaga',
              municipio: 'Macharaviaya',
              titulos: 'Técnico superior en jefatura de proyecto, Técnico de grado medio en programación'
            },
            {
              idPuesto: 'p5',
              puesto: 'Administrativa',
              familia: 'Administración y Gestión',
              fecha: '25/01/2019',
              descripcion: 'Empresa líder en su sector busca gente joven para trabajar mucho',
              provincia: 'Málaga',
              municipio: 'Torrox',
              titulos: 'Técnico superior en solución de líos, Técnico de grado medio en gestión de citas'
            },
            {
              idPuesto: 'p6',
              puesto: 'Desarrollador de aplicaciones',
              familia: 'Informática y comunicaciones',
              fecha: '23/01/2019',
              descripcion: 'Empresa líder en su sector busca gente joven para trabajar mucho',
              provincia: 'Granada',
              municipio: 'Motril',
              titulos: 'Técnico superior en jefatura de proyecto, Técnico de grado medio en programación'
            }
          ]

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
