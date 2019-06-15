import { Institution } from './models/study.model';

export class MockData {
  public static readonly VOCATIONAL_INSTITUTION: Institution[] = [
    { uid: 1, name: 'IES Belén' },
    { uid: 2, name: 'IES Politécnico Jesús Marín' },
    { uid: 3, name: 'IES Rosaleda' }
  ];
  public static readonly VOCATIONAL_CATEGORY = [
    { uid: 1, name: 'Artes Gráficas' },
    { uid: 2, name: 'Informática y comunicaciones' },
    { uid: 3, name: 'Imagen y sonido' },
    { uid: 4, name: 'Comercio y Marketing' },
    { uid: 5, name: 'Administración y Gestión' }
  ];
  public static readonly VOCATIONAL_TITLE = [
    { uid: 1, name: 'Desarrollo de Aplicaciones Web' },
    { uid: 2, name: 'Administración de Sistemas Informáticos y Redes ' },
    { uid: 3, name: 'VideoDJ' },
    { uid: 4, name: 'Desarrollo Aplicaciones Multiplataforma' },
    { uid: 5, name: 'Gestión Comercial y Empresarial' },
    { uid: 6, name: 'Empresariales' }
  ];
  public static readonly VOCATIONAL_GRADES = [
    { uid: 1, name: 'FP Básica' },
    { uid: 2, name: 'Ciclo Formativo de Grado Medio' },
    { uid: 3, name: 'Ciclo Formativo de Grado Superior' }
  ];
  public static readonly TYPE_STUDIES = [
    { uid: 1, name: 'Ciclo formativo' },
    { uid: 2, name: 'Título Universitario' },
    { uid: 3, name: 'Otro título' }
  ];
  public static readonly LANGUAGES_LEVEL = [
    { uid: 1, name: 'A1' },
    { uid: 2, name: 'A2' },
    { uid: 3, name: 'B1' },
    { uid: 4, name: 'B2' },
    { uid: 5, name: 'C1' },
    { uid: 6, name: 'C2' }
  ];
  public static readonly LANGUAGES_NAME = [
    { uid: 1, name: 'Inglés' },
    { uid: 2, name: 'Francés' },
    { uid: 3, name: 'Alemán' },
    { uid: 4, name: 'Espaol' }
  ];
  public static readonly DOCUMENTS_TYPE = [
    { uid: 1, name: 'NIF' },
    { uid: 2, name: 'Pasaporte' },
    { uid: 3, name: 'Otro' }
  ];
  public static readonly MUNICIPES = [
    { uid: 1, name: 'Málaga' },
    { uid: 2, name: 'Fuengirola' },
    { uid: 3, name: 'Rincón de la victoria' },
    { uid: 4, name: 'Dos hermanas' },
    { uid: 5, name: 'Sevilla' },
    { uid: 6, name: 'Chiclana de la Frontera' },
    { uid: 7, name: 'Estepona' },
    { uid: 8, name: 'Campanillas (PTA)' },
    { uid: 9, name: 'Motril' },
    { uid: 10, name: 'Osuna' }
  ];
  public static readonly PROVINCES = [
    { uid: 1, name: 'Málaga' },
    { uid: 2, name: 'Sevilla' },
    { uid: 3, name: 'Huelva' },
    { uid: 4, name: 'Cádiz' },
    { uid: 5, name: 'Granada' }
  ];

  public static fakeIncreaseID<T>(collection, object: T): T {
    const _object = { ...object };
    const uid = collection[collection.length - 1].uid + 1;
    _object['uid'] = uid;
    return _object;
  }
}
