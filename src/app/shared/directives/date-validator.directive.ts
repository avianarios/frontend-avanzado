import { ValidatorFn, AbstractControl } from '@angular/forms';
import * as moment from 'moment';
export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = !moment(control.value, 'DD/MM/YYYY', true).isValid();
    return forbidden ? { forbiddenDate: { value: control.value } } : null;
  };
}
