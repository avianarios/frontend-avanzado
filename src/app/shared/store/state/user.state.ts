import { Study } from '../../models/study.model';
import { User } from '../../models/user.model';
import { Language } from '../../models/language.model';
import { Experience } from '../../models/experience.model';
import { Offer } from '../../models/offer.model';

export interface UserState{
  personales: User;
  formacion: Study;
  idiomas: Language;
  experiencia: Experience;
  ofertas: Offer;
}

export const initialUserState: UserState={
  personales:null,
  formacion:null,
  idiomas:null,
  experiencia:null,
  ofertas:null
}
