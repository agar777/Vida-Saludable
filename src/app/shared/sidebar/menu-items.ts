import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
 
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/dashboard/remedios/alimentacion',
    title: 'Alimentación',
    icon: 'bi bi-egg-fried',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/dashboard/remedios/agua',
    title: 'Agua',
    icon: 'bi bi-droplet',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/dashboard/remedios/ejercicio',
    title: 'Ejercicio',
    icon: 'bi bi-bicycle',
    class: '',
    extralink: false,
    submenu: []
  }
];
