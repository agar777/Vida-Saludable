import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { SwPush} from '@angular/service-worker';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { NotificacionesService } from './app/core/services/notificaciones.service';

const VAPID_PUBLIC_KEY = 'BJ4jcc5FEKwNV1L9GYJyGAAcsJN6egtvd_NW5pXdMY1qRbQKUw2Um85-0--oLaj7-SWcB08bQ5fxxx8dM1ttM2c';

if (environment.production) {
  enableProdMode();
}

let notificacionService: NotificacionesService;

if ('serviceWorker' in navigator && environment.production) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration: ServiceWorkerRegistration) => {
        console.log('hola');

    })
    .catch((error) => {
      console.error('Error al registrar el Service Worker:', error);
    });
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
