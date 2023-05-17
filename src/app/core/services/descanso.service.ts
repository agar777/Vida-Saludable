import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection,query,orderBy, Firestore,collectionData, where} from '@angular/fire/firestore';
import { Alimentacion } from '../models/alimentacion';
import { TokenStorageService } from './token-storage.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DescansoService {

  descanso: any[]=[];
  public progreso:any[]=[]
  public progresoD:any[]=[]


  constructor(private store: AngularFirestore,private  firestore: Firestore, 
    private tokenStorage:TokenStorageService, private datePipe: DatePipe
    ) { 
      this.progreso.splice(0,0);
      this.getProgress();
    }

  getAll(): Observable<any>{
    this.descanso.splice(0,2);
    this.store.firestore.collection('descanso').orderBy('descanso_id').onSnapshot({includeMetadataChanges:true},(snapshot)=>{
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
        hora:data['hora'],
        porque:data['porque'],
        progreso: 50 
      }     

      return of(this.store.collection('h_descanso').add(ref))
    }
  
    getProgress(): Observable<any>{
      let suma = 0;      
      this.progreso.splice(0,0);
      this.store.firestore.collection('h_descanso').where('fecha','==',this.datePipe.transform(Date.now(),'yyyy-MM-dd')).where('user_id','==',this.tokenStorage.getId()).
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
      this.store.firestore.collection('h_descanso').where('fecha','==',date).where('user_id','==',this.tokenStorage.getId()).
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
