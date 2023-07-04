import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection,query,orderBy, Firestore,collectionData, where} from '@angular/fire/firestore';
import { Agua, Alimentacion } from '../models/alimentacion';
import { TokenStorageService } from './token-storage.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AguaService {

  agua:any[]=[]
  public progreso:any[]=[]
  public progresoD:any[]=[]
  cantidad: any[]=[]
  disabled_agua: any[]=[]

  constructor(private store: AngularFirestore,private  firestore: Firestore,
    private tokenStorage: TokenStorageService, private datePipe: DatePipe) {
      this.progreso = []
      this.getProgress();
     }

  getAll(): Observable<any>{
    // this.agua.splice(0,8);
    // this.store.firestore.collection('agua').orderBy('agua_id').onSnapshot({includeMetadataChanges:true},(snapshot)=>{
    //   snapshot.docChanges().forEach((change)=>{
    //     if(change.type ==="added"){
    //         this.agua.push(change.doc.data());
    //     }

    //   })
    //   let source = snapshot.metadata.fromCache ? "local cache" : "firebase server";
    // })
    // return of(this.agua)
    const ref = collection(this.firestore,'agua');
    const orderedRef = query(ref, orderBy('agua_id'));
    return collectionData(orderedRef,{idField:'id'})as Observable<any>;
  }

    create(data:any):Observable<any>{
      let ref={
        user_id: this.tokenStorage.getId(),
        agua_id: data['agua_id'],
        fecha:data['fecha'],
        hora:data['hora'],
        disabled: true,
        progreso: 12.5
      }
      return of(this.store.collection('h_agua').add(ref))
    }

    getProgress(): Observable<any>{
      this.progreso.splice(0,0);
      let suma = 0;
      this.store.firestore.collection('h_agua').where('fecha','==',this.datePipe.transform(Date.now(),'yyyy-MM-dd')).where('user_id','==',this.tokenStorage.getId()) .onSnapshot({includeMetadataChanges:true},(snapshot)=>{
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
      this.store.firestore.collection('h_agua').where('fecha','==',date).where('user_id','==',this.tokenStorage.getId()) .onSnapshot({includeMetadataChanges:true},(snapshot)=>{
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



    cantidadVasos(){
      this.cantidad = []
      let suma = 0;
      this.store.firestore.collection('h_agua').where('fecha','==',this.datePipe.transform(Date.now(),'yyyy-MM-dd')).where('user_id','==',this.tokenStorage.getId()).onSnapshot({includeMetadataChanges:true},(snapshot)=>{
        snapshot.docChanges().forEach((change)=>{
          if(change.type ==="added"){
            suma+= 1;
            this.cantidad.push(suma);

          }
        })
        let source = snapshot.metadata.fromCache ? "local cache" : "firebase server";
      })

      return of(this.cantidad)
    }


    disabledAgua(id:any){
      // this.progreso.splice(0,0);
      // this.store.firestore.collection('h_agua').where('fecha','==',this.datePipe.transform(Date.now(),'yyyy-MM-dd')).where('user_id','==',this.tokenStorage.getId()).where('agua_id','==',id).onSnapshot({includeMetadataChanges:true},(snapshot)=>{
      //   snapshot.docChanges().forEach((change)=>{
      //     if(change.type ==="added"){
      //       this.disabled_agua.push(change.doc.data());
      //     }
      //   })
      //   let source = snapshot.metadata.fromCache ? "local cache" : "firebase server";
      // })

      // return of(this.disabled_agua)

      const ref = collection(this.firestore,'h_agua');
      const orderedRef = query(ref, where('fecha','==',this.datePipe.transform(Date.now(),'yyyy-MM-dd')),where('user_id','==',this.tokenStorage.getId()), where('agua_id','==',id) );
      return collectionData(orderedRef).pipe(
        map(data => (data.length > 0 ? data[0] : null))
      ) as Observable<any>;


    }



}
