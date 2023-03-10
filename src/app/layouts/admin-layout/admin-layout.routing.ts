import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { canActivate, redirectUnauthorizedTo  } from '@angular/fire/auth-guard';
export const AdminLayoutRoutes: Routes = [
    { 
        path: 'dashboard',
        component: DashboardComponent,
        ...canActivate(()=>redirectUnauthorizedTo(['/login']))
     },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },

      {
        path: 'remedios',
        loadChildren: () => import('src/app/remedios/remedios.module').then(m => m.RemediosModule)
      }
  

];
