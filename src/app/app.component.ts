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
    // this.subscribeToNotifications();
    this.send("Vida Saludable", "No olvides registrar tu progreso")
    // this.fireNoti.requestPermission();
    // this.fireNoti.receiveMessages();
    // this.message = this.fireNoti.currentMessage;
    this.send("Agua","Toma un vaso de agua para estar con buenas energias")

    this.hora= datePipe.transform(Date.now(),'HH:mm');
    // this.fireNoti.sendPushNotification("Vida Saludable","No te olvides de registrar tus progreso")

    if(this.hora >= '08:00' && this.hora <= '9:00'){
      this.send("Hora de Desayunar","¡Buenos días! Es hora de disfrutar de un delicioso desayuno saludable. Recuerda que el desayuno es la comida más importante del día. ")
      // this.send("Agua","Toma un vaso de agua para estar con buenas energias")
      this.send("Orar","¡Ora con fe y confianza en que tus palabras son escuchadas y que siempre serás guiado hacia la luz")
    }else if(this.hora >='12:30' && this.hora <= '14:00'  ){
      this.send("Hora de Almorzar","¡Buenas tardes! Es hora de disfrutar de un delicioso almuerzo saludable. ")
      // this.send("Agua","Toma un vaso de agua para estar con buenas energias")
      this.send("Orar","¡Ora con fe y confianza en que tus palabras son escuchadas y que siempre serás guiado hacia la luz")

    }
    else if (this.hora >='17:30' && this.hora <='21:00'){
      this.send("Hora de Cenar","¡Buenas noches! Es hora de disfrutar de una deliciosa cena saludable.")
      // this.send("Agua","Toma un vaso de agua para estar con buenas energias")
      this.send("Orar","¡Ora con fe y confianza en que tus palabras son escuchadas y que siempre serás guiado hacia la luz")
    }
    else if(this.hora >= '21:00' && this.hora <= '22:30'){
      this.send("Hora de descansar","Un buen descanso es la clave para un nuevo comienzo")
      this.send("Agua","Toma un vaso de agua para estar con buenas energias")
      this.send("Orar","¡Ora con fe y confianza en que tus palabras son escuchadas y que siempre serás guiado hacia la luz")
    }

    if(this.hora>='06:00' && this.hora <= '08:00' ){
      this.send("Hora de despertar","¡Buenos días! ¡Es hora de despertar y comenzar un nuevo día lleno de oportunidades! ")
      this.send("Orar","¡Ora con fe y confianza en que tus palabras son escuchadas y que siempre serás guiado hacia la luz")
    }
  }

  send(title:string, body:string) {
    this.notificacionService.sendNotification({title,body}).subscribe(data=>{
      console.log("enviado");
    })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.subscribeToNotifications();


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
