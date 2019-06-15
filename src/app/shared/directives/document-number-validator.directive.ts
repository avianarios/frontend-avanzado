import { ValidatorFn, FormGroup } from '@angular/forms';
import { AppSettings } from '../app.settings';
import { MockData } from '../mock-data';

const COMMAND = {
  [MockData.DOCUMENTS_TYPE[0].uid]: isValidNIF,
  [MockData.DOCUMENTS_TYPE[1].uid]: isValidPassport,
  [MockData.DOCUMENTS_TYPE[2].uid]: isValidOther,
  execute: function(documentType, params) {
    const type = documentType.uid;
    return !this[type](params);
  }
};
function isValidNIF(nif: string): boolean {
  let isValid = false;
  let fixedNIF = nif.toUpperCase();

  let correctDigit = '';
  let writtenDigit = '';

  if (!/^[A-Z]+$/i.test(fixedNIF.substr(1, 1))) {
    fixedNIF = '000000000' + nif;
    fixedNIF = fixedNIF.substr(-9);
  }

  writtenDigit = nif.substr(-1, 1);

  if (isValidNIFFormat(fixedNIF)) {
    correctDigit = getNIFCheckDigit(fixedNIF);

    if (writtenDigit == correctDigit) {
      isValid = true;
    }
  }
  return isValid;
}
function isValidNIFFormat(docNumber) {
  return respectsDocPattern(
    docNumber,
    /^[KLM0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][A-Z0-9]/
  );
}
function respectsDocPattern(givenString, pattern) {
  let isValid = false;

  let fixedString = givenString.toUpperCase();
  const firstChar = parseInt(fixedString.substr(0, 1), 10);

  if (firstChar % 1 === 0) {
    fixedString = '000000000' + fixedString;
    fixedString = fixedString.substr(-9);
  }

  if (pattern.test(fixedString)) {
    isValid = true;
  }

  return isValid;
}
function getNIFCheckDigit(docNumber) {
  const keyString = 'TRWAGMYFPDXBNJZSQVHLCKE';

  let fixedDocNumber = docNumber.toUpperCase();

  let position = 0;
  let writtenLetter = '';
  let correctLetter = '';

  if (!/^[A-Z]+$/i.test(fixedDocNumber.substr(1, 1))) {
    fixedDocNumber = '000000000' + fixedDocNumber;
    fixedDocNumber = fixedDocNumber.substr(-9);
  } else {
    fixedDocNumber = docNumber.toUpperCase();
  }

  if (isValidNIFFormat(fixedDocNumber)) {
    writtenLetter = fixedDocNumber.substr(-1);

    fixedDocNumber = fixedDocNumber.replace('K', '0');
    fixedDocNumber = fixedDocNumber.replace('L', '0');
    fixedDocNumber = fixedDocNumber.replace('M', '0');

    position = fixedDocNumber.substr(0, 8) % 23;
    correctLetter = keyString.substr(position, 1);
  }

  return correctLetter;
}

function isValidPassport(passport: string): boolean {
  //TODO: This code is not develop yet.
  return true;
}
function isValidOther(other: string): boolean {
  return true;
}
export function documentNumberValidator(): ValidatorFn {
  return (form: FormGroup): { [key: string]: any } | null => {
    const documentType = form.controls['documentType'].value;
    const documentNumber = form.controls['documentNumber'].value;
    const forbidden = COMMAND.execute(documentType, documentNumber);
    return forbidden
      ? { documentNumberForbbiden: { value: documentNumber } }
      : null;
  };
}
