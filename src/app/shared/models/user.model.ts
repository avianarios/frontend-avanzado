import { AppSettings } from '../app.settings';
import { Study, VocationalStudy, CollegeStudy } from './study.model';
import { Language } from './language.model';
import { Offer } from './offer.model';
import { Experience } from './experience.model';
export interface Users {
  [id: number]: User;
}

export interface UserAddress {
  street: string;
  province: Province;
  municipe: Municipe;
}
export interface DocumentType {
  uid: number;
  name: string;
}
export interface Municipe {
  uid: number;
  name: string;
}
export interface Province {
  uid: number;
  name: string;
}
export interface User {
  password: string; // Only for mock
  id: number;
  username: string;
  name: string;
  surname: string;
  birthdate: string;
  phone: string;
  phone2: string;

  email: string;
  documentNumber: string;
  documentType: DocumentType;
  aboutMe: string;
  otherCompetences: string;
  license: string;
  avatar_hash: string;
  address: UserAddress;
  roles: string[];
  studies: (VocationalStudy | CollegeStudy)[];
  experiencies: Experience[];
  languages: Language[];
  offers: Offer[];
}

export function createNewUser(user?: User): User {
  return {
    ...user,
    name: '',
    surname: '',
    id: -1,
    email: '',
    roles: [''],
    /*  avatar_hash: this.avatar_hash || null, */
    experiencies: [],
    studies: [],
    languages: [],
    offers: []
  };
}
