import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormArray, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { SesionService } from '../../shared/services/sesion.service';

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

   constructor(private _builder: FormBuilder) {
     // Crea un FormControl para cada provincia, lo inicializa como desmarcado y lo mete en una matriz
     const formControls = this.listaProvincias.map(control => new FormControl(false));

     // Crea el formulario completo y le añade la matriz
     this.formConfiguracion = this._builder.group({
       idioma: new FormControl(),
       listaProvincias: new FormArray(formControls),
       seleccionarTodos: new FormControl(false)
     });
   }

   ngOnInit() {
     this.cuandoCambie();
   }

   cuandoCambie(): void {
     // Suscribirse a cambios en la casilla de seleccionar todos
     this.formConfiguracion.get('seleccionarTodos').valueChanges.subscribe(bool => {
       this.formConfiguracion
         .get('listaProvincias')
         .patchValue(Array(this.listaProvincias.length).fill(bool), { emitEvent: false });
     });

     // Suscribirse a cambios en cada casilla
     /*this.formConfiguracion.get('listaProvincias').valueChanges.subscribe(val => {
       const allSelected = val.every(bool => bool);
       if (this.formConfiguracion.get('seleccionarTodos').value !== allSelected) {
         this.formConfiguracion.get('seleccionarTodos').patchValue(allSelected, { emitEvent: false });
       }
     });*/
   }

   submit() {
     // Filtra  las provincias no seleccionadas
     const selectedPreferences = this.formConfiguracion.value.listaProvincias
       .map((checked, index) => checked ? this.listaProvincias[index].nombre : null)
       .filter(value => value !== null);

     console.log (this.formConfiguracion.value.idioma, selectedPreferences);
   }

}
