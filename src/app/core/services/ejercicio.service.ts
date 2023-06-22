import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection,query,orderBy, Firestore, addDoc, collectionData, onSnapshot } from '@angular/fire/firestore';
import { Ejercicio } from '../models/ejercicio';
import { TokenStorageService } from './token-storage.service';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})


export class EjercicioService {

  ejercicio:any[]=[];
  public progreso:any[]=[];
  public progresoD:any[]=[];
  tipo_ejercicio:any[]=[];


  constructor(private store: AngularFirestore,private  firestore: Firestore,
    private tokenStorage: TokenStorageService,private datePipe: DatePipe ){
      this.progreso.splice(0,0);
      this.getProgress();
    }

  getAll(): Observable<any>{
    this.ejercicio.splice(0,2);
    this.store.firestore.collection('ejercicio').orderBy('ejercicio_id').onSnapshot({includeMetadataChanges:true},(snapshot)=>{
      snapshot.docChanges().forEach((change)=>{
        if(change.type ==="added"){
            this.ejercicio.push(change.doc.data());
        }

      })
      let source = snapshot.metadata.fromCache ? "local cache" : "firebase server";
    })
    return of(this.ejercicio)
  }

    create(data:any):Observable<any>{
      let ref={
        user_id: this.tokenStorage.getId(),
        ejercicio_id: data['ejercicio_id'],
        fecha:data['fecha'],
        hora:data['hora'],
        hora_inicio:data['hora_inicio'],
        hora_fin:data['hora_fin'],
        otro:data['otro'],
        progreso:data['progreso']
       }

      return of(this.store.collection('h_ejercicio').add(ref))

    }

    getTipoEjercicio(id:any):Observable<any>{
      this.tipo_ejercicio.splice(0,4);
      this.store.firestore.collection('tipo_ejercicio').where('ejercicio_id','==',id).onSnapshot({includeMetadataChanges:true},(snapshot)=>{
        snapshot.docChanges().forEach((change)=>{
          if(change.type ==="added"){
              this.tipo_ejercicio.push(change.doc.data());
          }

        })
        let source = snapshot.metadata.fromCache ? "local cache" : "firebase server";
      })
      return of(this.tipo_ejercicio)
    }

    getProgress(): Observable<any>{
      let suma = 0;
      this.progreso.splice(0,0);
      this.store.firestore.collection('h_ejercicio').where('fecha','==',this.datePipe.transform(Date.now(),'yyyy-MM-dd')).where('user_id','==',this.tokenStorage.getId()).
      onSnapshot({includeMetadataChanges:true},(snapshot)=>{
        snapshot.docChanges().forEach((change)=>{
          if(change.type ==="added"){
              suma += change.doc.get('progreso')
              this.progreso.push(suma);
          }
        })
        let source = snapshot.metadata.fromCache ? "local cache" : "firebase server";
      })

      return of(this.progreso)
    }

    public getProgressD(date: any){
      let suma = 0;
      this.progresoD = []
      this.store.firestore.collection('h_ejercicio').where('fecha','==',date).where('user_id','==',this.tokenStorage.getId()).
      onSnapshot({includeMetadataChanges:true},(snapshot)=>{
        snapshot.docChanges().forEach((change)=>{
          if(change.type ==="added"){
              suma += change.doc.get('progreso')
              this.progresoD.push(suma);
          }
        })
        let source = snapshot.metadata.fromCache ? "local cache" : "firebase server";
      })

      return this.progresoD
    }

}
