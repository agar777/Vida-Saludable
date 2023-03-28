import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { RemediosRoutingModule } from './remedios-routing.module';
import { AlimentacionComponent } from './alimentacion/alimentacion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { EjercicioComponent } from './ejercicio/ejercicio.component';
import { AguaComponent } from './agua/agua.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TipoEjerciciosComponent } from './tipo-ejercicios/tipo-ejercicios.component';
import { CronometroComponent } from './cronometro/cronometro.component';
import { WebMaterialModule } from '../../webmaterial.module';
import { LuzSolarComponent } from './luz-solar/luz-solar.component';
import { DescansoComponent } from './descanso/descanso.component';
import { EsperanzaComponent } from './esperanza/esperanza.component';

// import{} from'@angular/flex-layout'
@NgModule({
  declarations: [
    AlimentacionComponent,
    ConfiguracionComponent,
    EjercicioComponent,
    AguaComponent,
    TipoEjerciciosComponent,
    CronometroComponent,
    LuzSolarComponent,
    DescansoComponent,
    EsperanzaComponent
  ],
  imports: [
    CommonModule,
    RemediosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    WebMaterialModule
  ],
  providers: [
  AngularFirestore,
  DatePipe,
  ]
})
export class RemediosModule { }
