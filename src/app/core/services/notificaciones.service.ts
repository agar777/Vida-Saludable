import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  public url='http://localhost:9000'

  constructor(private http: HttpClient){
    }

  saveToken=(token:any)=>{
    return this.http.post(`${this.url}/save`,{token})
  }
}
