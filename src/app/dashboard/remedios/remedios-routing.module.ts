import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EjercicioComponent } from './ejercicio/ejercicio.component';
import { AlimentacionComponent } from './alimentacion/alimentacion.component';
import { AguaComponent } from './agua/agua.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemediosRoutingModule { }
