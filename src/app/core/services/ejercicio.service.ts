import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection,query,orderBy, Firestore, addDoc, collectionData, onSnapshot } from '@angular/fire/firestore';
import { Ejercicio } from '../models/ejercicio';

@Injectable({
  providedIn: 'root'
})
export class EjercicioService {


  constructor(private store: AngularFirestore,private  firestore: Firestore) { }

  getAll(): Observable<any>{
    const ref = collection(this.firestore,'ejercicio');
    const q = query(ref, orderBy('nombre'))
    // const ref = this.store.collection(this.firestore,'ejercicio', ref=> ref.orderBy('ejercicio_id'))
    return collectionData(q,{idField:'id'})as Observable<Ejercicio[]>;
  }

    create(data:any){
      let ref={
        nombre: data['nombre'],
        descripcion:data['descripcion'],
        repeticiones:data['repeticiones'],
        series:data['series'],
        descanso:data['descanso'],
        fecha:data['fecha']
      }
      this.store.collection('h_ejercicio').add(ref)
    }

}
