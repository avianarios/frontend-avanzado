import { Province, Municipe } from './user.model';
import { Category, TitleStudy } from './study.model';

export interface Offer {
  id: number;
  company: CompanyOffer;
  job: JobOffer;
  province: Province;
  municipe: Municipe;
  date: string;
  category: Category;
  title: TitleStudy[];
}

export interface CompanyOffer {
  uid: number;
  name: string;
}
export interface JobOffer {
  uid: number;
  name: string;
}
