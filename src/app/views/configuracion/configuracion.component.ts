import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormArray, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { SesionService } from '../../shared/services/sesion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  nombreIdiomas=["Español", "Inglés", "Francés", "Aleḿan", "Italiano"];
  formConfiguracion: FormGroup;
   listaProvincias = [
     { nombre: 'Almería' },
     { nombre: 'Cádiz' },
     { nombre: 'Córdoba' },
     { nombre: 'Granada' },
     { nombre: 'Huelva' },
     { nombre: 'Jaén' },
     { nombre: 'Málaga' },
     { nombre: 'Sevilla' }
   ];

   constructor(private _builder: FormBuilder, private _router: Router) {
     // Create a FormControl for each available music preference, initialize them as unchecked, and put them in an array
     const formControls = this.listaProvincias.map(control => new FormControl(false));

     // Create a FormControl for the select/unselect all checkbox
     const selectAllControl = new FormControl(false);

     // Simply add the list of FormControls to the FormGroup as a FormArray, add the selectAllControl separetely
     this.formConfiguracion = this._builder.group({
      idioma: new FormControl(''),
       listaProvincias: new FormArray(formControls),
       selectAll: selectAllControl
     });
   }

   ngOnInit() {
//     this.onChanges();
   }

/*   onChanges(): void {
     // Suscribirse a cambios en la casilla de seleccionar todos
     this.formConfiguracion.get('selectAll').valueChanges.subscribe(bool => {
       this.formConfiguracion
         .get('listaProvincias')
         .patchValue(Array(this.listaProvincias.length).fill(bool), { emitEvent: false });
     });

     // Suscribirse a cambios en cada casilla
     this.formConfiguracion.get('listaProvincias').valueChanges.subscribe(val => {
       const allSelected = val.every(bool => bool);
       if (this.formConfiguracion.get('selectAll').value !== allSelected) {
         this.formConfiguracion.get('selectAll').patchValue(allSelected, { emitEvent: false });
       }
     });
   }*/

   submit() {
     // Filtra  las provincias no seleccionadas
     const selectedPreferences = this.formConfiguracion.value.listaProvincias
       .map((checked, index) => checked ? this.listaProvincias[index].nombre : null)
       .filter(value => value !== null);

     console.log (this.formConfiguracion.value.idioma, selectedPreferences);
   }

   ir(donde){
     this._router.navigateByUrl(donde);
   }

}
