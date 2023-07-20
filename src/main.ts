import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { NotificacionesService } from './app/core/services/notificaciones.service';
import { DatePipe } from '@angular/common';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).then((moduleRef) => {
  // const notificacionesService = moduleRef.injector.get(NotificacionesService);
  // const notificationTitle = 'Vida Saludable';
  // const notificationBody = 'No olvides registrar tu proceso';

  // const datePipe = new DatePipe('en-US');
  // const horaActual = datePipe.transform(Date.now(), 'HH:mm')|| '';
  // console.log(horaActual);

  // if (horaActual >= '08:00' && horaActual <= '09:00') {
  //   sendNotification(notificacionesService,"Agua", "Toma un vaso de agua para estar con buenas energías.");
  //   sendNotification(notificacionesService,"Hora de Desayunar", "¡Buenos días! Es hora de disfrutar de un delicioso desayuno saludable. Recuerda que el desayuno es la comida más importante del día.");
  //   sendNotification(notificacionesService,"Orar", "¡Ora con fe y confianza en que tus palabras son escuchadas y que siempre serás guiado hacia la luz.");
  // } else if (horaActual >= '12:30' && horaActual <= '14:00') {
  //   sendNotification(notificacionesService,"Agua", "Toma un vaso de agua para estar con buenas energías.");
  //   sendNotification(notificacionesService,"Hora de Almorzar", "¡Buenas tardes! Es hora de disfrutar de un delicioso almuerzo saludable.");
  //   sendNotification(notificacionesService,"Orar", "¡Ora con fe y confianza en que tus palabras son escuchadas y que siempre serás guiado hacia la luz.");
  // } else if (horaActual >= '17:30' && horaActual <= '21:00') {
  //   sendNotification(notificacionesService,"Agua", "Toma un vaso de agua para estar con buenas energías.");
  //   sendNotification(notificacionesService,"Hora de Cenar", "¡Buenas noches! Es hora de disfrutar de una deliciosa cena saludable.");
  //   sendNotification(notificacionesService,"Orar", "¡Ora con fe y confianza en que tus palabras son escuchadas y que siempre serás guiado hacia la luz.");
  // } else if (horaActual >= '21:00' && horaActual <= '22:30') {
  //   sendNotification(notificacionesService,"Hora de descansar", "Un buen descanso es la clave para un nuevo comienzo.");
  //   sendNotification(notificacionesService,"Agua", "Toma un vaso de agua para estar con buenas energías.");
  //   sendNotification(notificacionesService,"Orar", "¡Ora con fe y confianza en que tus palabras son escuchadas y que siempre serás guiado hacia la luz.");
  // }

  // sendNotification(notificacionesService,notificationTitle,notificationBody)
  // sendNotification(notificacionesService,"Agua", "Toma un vaso de agua para estar con buenas energías.");




})
  .catch(err => console.log(err));
function urlBase64ToUint8Array(publicVapidKey: any): string | BufferSource | null | undefined {
  throw new Error('Function not implemented.');
}

function sendNotification(notificacionesService:NotificacionesService,notificationTitle:string,notificationBody:string) {
  notificacionesService.sendNotification({ title: notificationTitle, body: notificationBody }).subscribe(
    data=>{
      console.log('enviado');
    }

  );
}

