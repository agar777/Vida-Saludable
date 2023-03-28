import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EjercicioComponent } from './ejercicio/ejercicio.component';
import { AlimentacionComponent } from './alimentacion/alimentacion.component';
import { AguaComponent } from './agua/agua.component';
import { TipoEjerciciosComponent } from './tipo-ejercicios/tipo-ejercicios.component';
import { LuzSolarComponent } from './luz-solar/luz-solar.component';
import { DescansoComponent } from './descanso/descanso.component';
import { EsperanzaComponent } from './esperanza/esperanza.component';

const routes: Routes = [
  {
    path:'alimentacion',
    component: AlimentacionComponent
  },
  {
    path:'ejercicio',
    component: EjercicioComponent
  },
  {
    path:'agua',
    component: AguaComponent
  },
  {
    path:'tipo-ejercicio/:id',
    component: TipoEjerciciosComponent
  },
  {
    path:'luz-solar',
    component: LuzSolarComponent
  },
  {
    path:'descanso',
    component: DescansoComponent
  },
  {
    path:'esperanza',
    component: EsperanzaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemediosRoutingModule { }
