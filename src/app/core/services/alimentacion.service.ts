import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection,query,orderBy, Firestore, addDoc, collectionData, onSnapshot } from '@angular/fire/firestore';
import { Alimentacion } from '../models/alimentacion';

@Injectable({
  providedIn: 'root'
})
export class AlimentacionService {


  constructor(private store: AngularFirestore,private  firestore: Firestore) { }

  getAll(): Observable<any>{
    const ref = collection(this.firestore,'alimentacion');
    const q = query(ref, orderBy('nutricion_id'))
    // const ref = this.store.collection(this.firestore,'alimentacion', ref=> ref.orderBy('nutricion_id'))
    return collectionData(q,{idField:'id'})as Observable<Alimentacion[]>;
  }

    create(data:any){
      let ref={
        nutricion_id: data['nutricion_id'],
        saludable:data['saludable'],
        fecha:data['fecha'] 
      }
      this.store.collection('h_alimentacion').add(ref)
    }

}
