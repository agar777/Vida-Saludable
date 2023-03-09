import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EjercicioComponent } from './ejercicio/ejercicio.component';
import { AlimentacionComponent } from './alimentacion/alimentacion.component';

const routes: Routes = [
  {
    path:'alimentacion',
    component: AlimentacionComponent
  },
  {
    path:'ejercicio',
    component: EjercicioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemediosRoutingModule { }
