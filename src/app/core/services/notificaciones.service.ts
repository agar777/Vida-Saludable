import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SwPush } from '@angular/service-worker';
@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  public url='https://notificaciones-vs-production.up.railway.app'

  constructor(
    private http: HttpClient,
  ) {
  }

  saveToken=(token:any)=>{
    return this.http.post(`${this.url}/save`,token,{
      headers: {
        'Content-Type':'application/json',
      }
    })
  }


  sendNotification=({title,body}:any)=>{
    return this.http.post(`${this.url}/send`,{title:title,body:body},{
      headers: {
        'Content-Type':'application/json',
      }
    })
  }

}
