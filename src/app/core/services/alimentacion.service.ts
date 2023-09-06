import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection,query,orderBy, Firestore,collectionData, where} from '@angular/fire/firestore';
import { Alimentacion } from '../models/alimentacion';
import { TokenStorageService } from './token-storage.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AlimentacionService {

  alimentacion: any[]=[];
  public progreso:any[]=[]
  public progresoD:any[]=[]


  constructor(private store: AngularFirestore,private  firestore: Firestore,
    private tokenStorage:TokenStorageService, private datePipe: DatePipe
    ) {
      this.progreso.splice(0,0);
      this.getProgress();
    }

  getAll(): Observable<any>{
    const ref = collection(this.firestore,'alimentacion');
    const orderedRef = query(ref, orderBy('nutricion_id'));
    return collectionData(orderedRef,{idField:'id'})as Observable<any>;
  }

    create(data:any):Observable<any>{
      let ref={
        user_id: this.tokenStorage.getId(),
        nutricion_id: data['nutricion_id'],
        saludable:data['saludable'],
        fecha:data['fecha'],
        hora:data['hora'],
        progreso: data['progreso']
      }

      return of(this.store.collection('h_alimentacion').add(ref))
    }

    public getProgress(): Observable<any>{
      let suma = 0;
      this.progreso.splice(0,1);
      this.store.firestore.collection('h_alimentacion').where('fecha','==',this.datePipe.transform(Date.now(),'yyyy-MM-dd')).where('user_id','==',this.tokenStorage.getId()).
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

    public getProgressD(date:any){
      this.progresoD = []
      let suma = 0;
      this.store.firestore.collection('h_alimentacion').where('fecha','==',date).where('user_id','==',this.tokenStorage.getId()).
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

    disabledAlimentacion(id:any){

      const ref = collection(this.firestore,'h_alimentacion');
      const orderedRef = query(ref, where('fecha','==',this.datePipe.transform(Date.now(),'yyyy-MM-dd')),where('user_id','==',this.tokenStorage.getId()), where('nutricion_id','==',id) );
      return collectionData(orderedRef).pipe(
        map(data => (data.length > 0 ? data[0] : null))
      ) as Observable<any>;

    }

}
