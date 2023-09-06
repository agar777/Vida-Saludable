import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { NotificacionesService } from './core/services/notificaciones.service';
// import { NotificacionesFireService } from './core/services/notificaciones-fire.service';
import { DatePipe } from '@angular/common';
import { TokenStorageService } from './core/services/token-storage.service';
// import { WhatsappService } from './core/services/whatsapp.service';

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
  token : any;
  constructor(private swPush:SwPush, private datePipe: DatePipe,
    private notificacionService:NotificacionesService, private tokenService:TokenStorageService   ) {
  }



  ngOnInit(): void {
    this.subscribeToNotifications();
  }

  subscribeToNotifications():any{
    this.swPush.requestSubscription({
      serverPublicKey:this.VAPID_PUBLIC_KEY
    }).then(data=>{
      const token = JSON.parse(JSON.stringify(data))
      this.notificacionService.saveToken(token).subscribe((data)=>{
        console.log(data);
        // this.tokenService.saveTokenNot(data);
      })

    })
  }




}
