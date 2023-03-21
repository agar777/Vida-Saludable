import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection,query,orderBy, Firestore, addDoc, collectionData, onSnapshot } from '@angular/fire/firestore';
import { Ejercicio } from '../models/ejercicio';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class EjercicioService {

  ejercicio:any[]=[];
  tipo_ejercicio:any[]=[];


  constructor(private store: AngularFirestore,private  firestore: Firestore,
    private tokenStorage: TokenStorageService ){ }

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
        hora_fin:data['hora_fin']      
       }     

      return of(this.store.collection('h_ejercicio').add(ref))

    }
  
    getTipoEjercicio(id:any):Observable<any>{
      this.tipo_ejercicio.splice(0,3);
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

}
