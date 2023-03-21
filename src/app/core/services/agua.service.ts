import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection,query,orderBy, Firestore,collectionData, where} from '@angular/fire/firestore';
import { Agua, Alimentacion } from '../models/alimentacion';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AguaService {

  agua:any[]=[]

  constructor(private store: AngularFirestore,private  firestore: Firestore,
    private tokenStorage: TokenStorageService) { }

  getAll(): Observable<any>{
    this.agua.splice(0,8);
    this.store.firestore.collection('agua').orderBy('agua_id').onSnapshot({includeMetadataChanges:true},(snapshot)=>{
      snapshot.docChanges().forEach((change)=>{   
        if(change.type ==="added"){          
            this.agua.push(change.doc.data());                        
        }
        
      })
      let source = snapshot.metadata.fromCache ? "local cache" : "firebase server";
    })
    return of(this.agua)
  }

    create(data:any):Observable<any>{
      let ref={
        user_id: this.tokenStorage.getId(),
        agua_id: data['agua_id'],
        fecha:data['fecha'],
        hora:data['hora']
      }
      return of(this.store.collection('h_agua').add(ref))
    }
  
    

}
