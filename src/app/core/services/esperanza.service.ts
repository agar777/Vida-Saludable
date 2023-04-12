import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection,query,orderBy, Firestore, addDoc, collectionData, onSnapshot } from '@angular/fire/firestore';
import { TokenStorageService } from './token-storage.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EsperanzaService {

  public progreso: any[]=[];

  constructor(private store: AngularFirestore,private firestore: Firestore,
    private tokenStorage: TokenStorageService, private datePipe: DatePipe ){
      this.getProgress();
     }

    create(data:any):Observable<any>{
      let ref={
        user_id: this.tokenStorage.getId(),
        fecha:data['fecha'],
        hora:data['hora'],
        orar:data['orar'],
        biblia:data['biblia'],
        pedido_oracion:data['pedido_oracion'],
        progreso: 33   
       }     

      return of(this.store.collection('esperanza').add(ref))

    }

    getProgress(): Observable<any>{
      let suma = 0;      
      this.store.firestore.collection('esperanza').where('fecha','==',this.datePipe.transform(Date.now(),'yyyy-MM-dd')).where('user_id','==',this.tokenStorage.getId()).
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

}
