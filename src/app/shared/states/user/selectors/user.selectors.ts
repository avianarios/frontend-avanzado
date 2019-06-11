import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';

export const getProfile = createFeatureSelector<User>('user');

export const getLanguages = createSelector(
  getProfile,
  ({ languages }) => languages
);
export function getLanguageByID(id: number) {
  return createSelector(
    getLanguages,
    languages => languages.find(language => language.uid === id)
  );
}

export const getStudies = createSelector(
  getProfile,
  ({ studies }) => studies
);
export function getStudyByID(id: number) {
  return createSelector(
    getStudies,
    studies => studies.find(study => study.uid === id)
  );
}
