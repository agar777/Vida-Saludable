import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { NotificacionesService } from './core/services/notificaciones.service';
// import { NotificacionesFireService } from './core/services/notificaciones-fire.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public readonly VAPID_PUBLIC_KEY = 'BJ4jcc5FEKwNV1L9GYJyGAAcsJN6egtvd_NW5pXdMY1qRbQKUw2Um85-0--oLaj7-SWcB08bQ5fxxx8dM1ttM2c'
  message: any;
  hora: any;
  /**
   *
   */
  constructor(private swPush:SwPush, private datePipe: DatePipe,
    private notificacionService:NotificacionesService  ) {
    this.subscribeToNotifications();
    // this.send()
    // this.fireNoti.requestPermission();
    // this.fireNoti.receiveMessages();
    // this.message = this.fireNoti.currentMessage;

    // this.hora= datePipe.transform(Date.now(),'HH:mm');
    // this.fireNoti.sendPushNotification("Vida Saludable","No te olvides de registrar tus progreso")

    // switch (this.hora) {
    //   case '07:00':
    //       this.fireNoti.sendPushNotification("Hora de Despertar","Es hora de despertar!!!")
    //     break;
    //   case '08:00':
    //       this.fireNoti.sendPushNotification("Hora de Desayunar","Llego la hora de un desayuno saludable")
    //       this.fireNoti.sendPushNotification("Agua","Toma un vaso de agua para estar con buenas energias")
    //       this.fireNoti.sendPushNotification("Orar","No te olvide de Orar antes de desayunar")
    //     break;
    //     case '12:30':
    //       this.fireNoti.sendPushNotification("Agua","Toma un vaso de agua para estar con buenas energias")
    //       this.fireNoti.sendPushNotification("Hora de Almorzar","Llego la hora de un almuerzo saludable")
    //       this.fireNoti.sendPushNotification("Orar","No te olvide de Orar antes de almorzar")
    //     break;
    //     case '18:30':
    //       this.fireNoti.sendPushNotification("Agua","Toma un vaso de agua para estar con buenas energias")
    //       this.fireNoti.sendPushNotification("Hora de Cenar","Llego la hora de una cena saludable")
    //       this.fireNoti.sendPushNotification("Orar","No te olvide de Orar antes de Cenar")
    //     break;
    //     case '22:00':
    //       this.fireNoti.sendPushNotification("Agua","Toma un vaso de agua para estar con buenas energias")
    //       this.fireNoti.sendPushNotification("Hora de Descansar","Llego la hora de dormir Zzzzz")
    //       this.fireNoti.sendPushNotification("Vida Saludable","No te olvides de registrar tus progreso")
    //     break;
    //   default:
    //     break;
    // }

  }

  send() {
    this.notificacionService.sendNotification().subscribe(data=>{
      console.log("enviado");

    })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.


  }

  subscribeToNotifications():any{
    this.swPush.requestSubscription({
      serverPublicKey:this.VAPID_PUBLIC_KEY
    }).then(data=>{
      const token = JSON.parse(JSON.stringify(data))
      console.log('OJO',token);
      this.notificacionService.saveToken(token).subscribe((data)=>{
        console.log(data);
      })

    })
  }

}
