import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection,query,orderBy, Firestore,collectionData, where} from '@angular/fire/firestore';
import { Alimentacion } from '../models/alimentacion';
import { TokenStorageService } from './token-storage.service';
import { DatePipe } from '@angular/common';
import { AguaService } from './agua.service';
import { AlimentacionService } from './alimentacion.service';
import { DescansoService } from './descanso.service';
import { EjercicioService } from './ejercicio.service';
import { EsperanzaService } from './esperanza.service';
import { LuzSolarService } from './luz-solar.service';

@Injectable({
  providedIn: 'root', 
})
export class ConfService {

  // alimentacion: any[]=[];
  progreso:any[]=[]
  progresoD:any[]=[]

  constructor(
    private agua: AguaService,
    private alimentacion: AlimentacionService,
    private descanso: DescansoService,
    private ejercicio: EjercicioService,
    private esperanza: EsperanzaService,
    private luz: LuzSolarService
    ) { }

    getProgresoDiario(): Observable<any>{
      this.progreso = []
      this.progreso.push(
        { 'nombre': 'agua', 'data': this.agua.progreso},
        {'nombre':'alimentacion', 'data': this.alimentacion.progreso},
        {'nombre':'descanso', 'data': this.descanso.progreso},
        {'nombre':'ejercicio', 'data': this.ejercicio.progreso},
        {'nombre':'esperanza', 'data': this.esperanza.progreso},
        {'nombre':'luz', 'data': this.luz.progreso},
      )

      return of(this.progreso)
    }


    getProgresoAll(fecha: any):Observable<any>{
      this.progresoD = []
      this.progresoD.push(
        { 'nombre': 'agua', 'data': this.agua.getProgressD(fecha)},
        {'nombre':'alimentacion', 'data': this.alimentacion.getProgressD(fecha)},
        {'nombre':'descanso', 'data': this.descanso.getProgressD(fecha)},
        {'nombre':'ejercicio', 'data': this.ejercicio.getProgressD(fecha)},
        {'nombre':'esperanza', 'data': this.esperanza.getProgressD(fecha)},
        {'nombre':'luz', 'data': this.luz.getProgressD(fecha)},
      )
      return of(this.progresoD)
    }

  

}
