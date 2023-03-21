import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection,query,orderBy, Firestore,collectionData, where} from '@angular/fire/firestore';
import { Alimentacion } from '../models/alimentacion';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AlimentacionService {

  alimentacion: any[]=[];

  constructor(private store: AngularFirestore,private  firestore: Firestore, 
    private tokenStorage:TokenStorageService
    ) { }

  getAll(): Observable<any>{
    this.alimentacion.splice(0,5);
    this.store.firestore.collection('alimentacion').orderBy('nutricion_id').onSnapshot({includeMetadataChanges:true},(snapshot)=>{
      snapshot.docChanges().forEach((change)=>{   
        if(change.type ==="added"){          
            this.alimentacion.push(change.doc.data());                        
        }
        
      })
      let source = snapshot.metadata.fromCache ? "local cache" : "firebase server";
    })
    return of(this.alimentacion)
  }

    create(data:any):Observable<any>{
      let ref={
        user_id: this.tokenStorage.getId(),
        nutricion_id: data['nutricion_id'],
        saludable:data['saludable'],
        fecha:data['fecha'],
        hora:data['hora'] 
      }     

      return of(this.store.collection('h_alimentacion').add(ref))
    }
  
    

}
