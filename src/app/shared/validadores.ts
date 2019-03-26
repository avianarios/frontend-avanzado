import { AbstractControl, ValidatorFn } from '@angular/forms';

export function cadenaLimpia(control: AbstractControl){
/*  var re = new RegExp("^[^\\s].+[^\\s]$");
  if (re.test(contol.value)) {
    return null;
  else
    return { 'espacios': true};*/
  //return /^[^\s].+[^\s]$/.test(control.value) ? null : { 'conEspacios': true };
  return /^[A-Za-z0-9\u00C0-\u017F][A-Za-z0-9 \u00C0-\u017F]*[A-Za-z0-9\u00C0-\u017F]$/.test(control.value) ? null : { 'cadenaLimpia': true };
}

export function sinEspacios(control: AbstractControl){
/*  var re = new RegExp("^[^\\s].+[^\\s]$");
  if (re.test(contol.value)) {
    return null;
  else
    return { 'espacios': true};*/
  //return /^[^\s].+[^\s]$/.test(control.value) ? null : { 'conEspacios': true };
  return /^[A-Za-z0-9\u00C0\u017F]*$/.test(control.value) ? null : { 'cadenaSinEspacios': true };
}

export function formatoFecha(control: AbstractControl){
  //return /^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0[1-9]|1\d|2[0-8])(\/)(?:(?:0[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{4})$/.test(control.value) ? null : { 'fechaIncorrecta': true};
  return /^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0[1-9]|1\d|2[0-8])(\/)(?:(?:0[1-9])|(?:1[0-2]))\4(?:(?:19|20)\d{2})$/.test(control.value) ? null : { 'fechaIncorrecta': true};

}

export function formatoPasaporte (control: AbstractControl){
  return /^[a-z]{3}[0-9]{6}[a-z]?$/.test(control.value) ? null : { 'pasaporteIncorrecto': true};
}

export function formatoNIF (control: AbstractControl){
  var letrasValidas = 'TRWAGMYFPDXBNJZSQVHLCKET';
  var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
  var nif = control.value.toString().toUpperCase();

  if (!nifRexp.test(nif)) return { 'NIFIncorrecto': true};

  var letraFinal = nif.substr(-1);
  var indice = parseInt(nif.substr(0, 8)) % 23;

  if (letrasValidas.charAt(indice) === letraFinal) return null;

  return { 'NIFIncorrecto': true};
}

export function formatoNIE (control: AbstractControl){
  var letrasValidas = 'TRWAGMYFPDXBNJZSQVHLCKET';
  var nieRexp = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
  var str = control.value.toString().toUpperCase();
  if (!nieRexp.test(str)) return { 'NIEIncorrecto': true};

  var nie = str
      .replace(/^[X]/, '0')
      .replace(/^[Y]/, '1')
      .replace(/^[Z]/, '2');

  var letraFinal = str.substr(-1);
  var indice = parseInt(nie.substr(0, 8)) % 23;
  if (letrasValidas.charAt(indice) === letraFinal) return null;

  return { 'NIEIncorrecto': true};
}

export function noSoloNumeros(control: AbstractControl){
  return /\d*/.test(control.value) ? null : { 'noSoloNumeros': true};
}
