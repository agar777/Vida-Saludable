import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemediosRoutingModule } from './remedios-routing.module';
import { AlimentacionComponent } from './alimentacion/alimentacion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
// import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
// import { MaterialTimePickerModule } from '@candidosales/material-time-picker';
// import{} from'@angular/flex-layout'
@NgModule({
  declarations: [
    AlimentacionComponent
  ],
  imports: [
    CommonModule,
    RemediosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // NgxMatTimepickerModule,
    MatCardModule,
  ]
})
export class RemediosModule { }
