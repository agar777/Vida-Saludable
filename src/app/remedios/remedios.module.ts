import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemediosRoutingModule } from './remedios-routing.module';
import { AlimentacionComponent } from './alimentacion/alimentacion.component';


@NgModule({
  declarations: [
    AlimentacionComponent
  ],
  imports: [
    CommonModule,
    RemediosRoutingModule
  ]
})
export class RemediosModule { }
