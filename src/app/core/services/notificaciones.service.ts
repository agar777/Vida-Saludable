import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  public url='https://notificaciones.fly.dev'
  // public url='http://localhost:3000'

  constructor(private http: HttpClient){
    }

  saveToken=(token:any)=>{
    return this.http.post(`${this.url}/save`,token,{
      headers: {
        'Content-Type':'application/json',
      }
    })
  }

  sendNotification=()=>{
    return this.http.post(`${this.url}/send`,{})
  }

}
