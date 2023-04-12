import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  messagingFirebase:firebase.messaging.Messaging;

  constructor(){
      firebase.initializeApp(environment.firebase);
      this.messagingFirebase = firebase.messaging();
    }

  requestPermission = ()=>{
    return new Promise(async(resolve,reject)=> {
      const permis = await Notification.requestPermission();
      if (permis === "granted") {
        const tokenFirebase = await this.messagingFirebase.getToken();
        resolve(tokenFirebase);
      }else{
        reject(new Error("No se otrogaron Permisos"))
      }
    })
  }

  private messaginObservable = new Observable(observe=>{
    this.messagingFirebase.onMessage(payload=>{
      observe.next(payload)
    })
  })

  receiveMessage(){
    return this.messaginObservable;
  }
}
