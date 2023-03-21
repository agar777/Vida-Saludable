import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EjercicioComponent } from './ejercicio/ejercicio.component';
import { AlimentacionComponent } from './alimentacion/alimentacion.component';
import { AguaComponent } from './agua/agua.component';
import { TipoEjerciciosComponent } from './tipo-ejercicios/tipo-ejercicios.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemediosRoutingModule { }
