import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class NotificacionesFireService {
  token: any;

  currentMessage = new BehaviorSubject<any>(null)

  constructor(private afMessaging: AngularFireMessaging,private http: HttpClient){
    }

    requestPermission() {
      this.afMessaging.requestToken.subscribe(
        (token) => {
          this.token = token
          console.log('Token:', token);
          this.currentMessage.next(token)
          // Envía el token al servidor para que pueda enviar notificaciones push al dispositivo
        },
        (error) => {
          console.error('Error al obtener el token:', error);
        }
      );
    }
  
    receiveMessages() {
      this.afMessaging.messages.subscribe(
        (message) => {
          console.log('Mensaje recibido:', message);
        },
        (error) => {
          console.error('Error al recibir mensaje:', error);
        }
      );
      // console.log('hola');
      
    }

  sendPushNotification(title:string,body:string){
    this.afMessaging.getToken.pipe(take(1)).subscribe(token => {
      const message = {
        notification: {
          title: title,
          body: body
        },
        to: token
      };

      this.afMessaging.messages.subscribe((respuesta: any) => {
        console.log('Mensaje enviado:', respuesta);
      });


      this.http.post('https://fcm.googleapis.com/fcm/send', message, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'key=AAAAg1cfB_Q:APA91bErz2ORQgInDsDuJhdfgPGnRvu5Jr_I9S8PgnX8aLAyZgDvmDK0ZsRXrMVhMACQSBaqaTzE8RETHxn5bXDfZqwS-4Ebpm3fpTDZd-C_r46ZlfObxISbMqem3WXHf5mrQavN0VA4'
        }
      }).subscribe((respuesta: any) => {
        console.log('Mensaje enviado:', respuesta);
      }, error => {
        console.error('Error al enviar mensaje:', error);
      });
    });
  }
}
