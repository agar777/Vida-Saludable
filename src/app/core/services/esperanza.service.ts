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
  public progresoD: any[]=[];
  esperanza: any[]=[];

  constructor(private store: AngularFirestore,private firestore: Firestore,
    private tokenStorage: TokenStorageService, private datePipe: DatePipe ){
      this.progreso.splice(0,0);
      this.getProgress();
     }

     getAll(): Observable<any>{
      this.esperanza.splice(0,2);
      this.store.firestore.collection('esperanza').orderBy('esperanza_id').onSnapshot({includeMetadataChanges:true},(snapshot)=>{
        snapshot.docChanges().forEach((change)=>{
          if(change.type ==="added"){
              this.esperanza.push(change.doc.data());
          }

        })
        let source = snapshot.metadata.fromCache ? "local cache" : "firebase server";
      })
      return of(this.esperanza)
    }

    create(data:any):Observable<any>{
      let ref={
        user_id: this.tokenStorage.getId(),
        fecha:data['fecha'],
        hora:data['hora'],
        esperanza_id: data['esperanza_id'],
        progreso: data['progreso']
       }

      return of(this.store.collection('h_esperanza').add(ref))

    }

    getProgress(): Observable<any>{
      let suma = 0;
      this.progreso.splice(0,0);
      this.store.firestore.collection('h_esperanza').where('fecha','==',this.datePipe.transform(Date.now(),'yyyy-MM-dd')).where('user_id','==',this.tokenStorage.getId()).
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
      this.store.firestore.collection('h_esperanza').where('fecha','==',date).where('user_id','==',this.tokenStorage.getId()).
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
