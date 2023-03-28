import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection,query,orderBy, Firestore,collectionData, where} from '@angular/fire/firestore';
import { Alimentacion } from '../models/alimentacion';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DescansoService {

  descanso: any[]=[];

  constructor(private store: AngularFirestore,private  firestore: Firestore, 
    private tokenStorage:TokenStorageService
    ) { }

  getAll(): Observable<any>{
    this.descanso.splice(0,2);
    this.store.firestore.collection('descanso').onSnapshot({includeMetadataChanges:true},(snapshot)=>{
      snapshot.docChanges().forEach((change)=>{   
        if(change.type ==="added"){          
            this.descanso.push(change.doc.data());                        
        }
        
      })
      let source = snapshot.metadata.fromCache ? "local cache" : "firebase server";
    })
    return of(this.descanso)
  }

    create(data:any):Observable<any>{
      let ref={
        user_id: this.tokenStorage.getId(),
        descanso:data['descanso'],
        fecha:data['fecha'],
        hora:data['hora'] 
      }     

      return of(this.store.collection('h_descanso').add(ref))
    }
  
    

}
