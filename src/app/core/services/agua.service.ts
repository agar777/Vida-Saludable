import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection,query,orderBy, Firestore,collectionData, where} from '@angular/fire/firestore';
import { Agua, Alimentacion } from '../models/alimentacion';

@Injectable({
  providedIn: 'root'
})
export class AguaService {


  constructor(private store: AngularFirestore,private  firestore: Firestore) { }

  getAll(): Observable<any>{
    const ref = collection(this.firestore,'agua');
    const q = query(ref,orderBy('agua_id'))
    // const ref = this.store.collection(this.firestore,'alimentacion', ref=> ref.orderBy('nutricion_id'))
    return collectionData(q,{idField:'id'})as Observable<Agua[]>;
  }

    create(data:any):Observable<any>{
      let ref={
        agua_id: data['agua_id'],
        fecha:data['fecha'],
        hora:data['hora'],
        estado:data['estado'] 
      }
      return of(this.store.collection('h_alimentacion').add(ref))
    }
  
    

}
