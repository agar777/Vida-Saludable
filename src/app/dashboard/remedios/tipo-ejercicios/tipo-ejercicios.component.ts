import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';
import { EjercicioService } from '../../../core/services/ejercicio.service';

@Component({
  selector: 'app-tipo-ejercicios',
  templateUrl: './tipo-ejercicios.component.html',
  styleUrls: ['./tipo-ejercicios.component.scss']
})
export class TipoEjerciciosComponent implements OnInit {
  id:any;
  ejercicio:any;
  form!: FormGroup;
  ejer:any;
  progress: any[]=[];

  constructor(
    private route:ActivatedRoute,
    private ejercicioService:EjercicioService,
    private formBuilder: FormBuilder,
    private dataPipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .subscribe((paramMap: any) => {
      this.id = paramMap.get('id'); 
    })
    this.listTipoEjercicio(this.id);
    this.create();
    this.progreso()
  }

  create() {
    this.form = this.formBuilder.group({
      ejercicio_id: ['',],
      hora:[''],
      hora_inicio:[''],
      hora_fin:[''],
      otro:[''],
      fecha:[this.dataPipe.transform(Date.now(),'yyyy-MM-dd')],
    })
  }

  listTipoEjercicio(id: any) {
    this.ejercicioService.getTipoEjercicio(id).subscribe(data=>{
        this.ejercicio = data;      
    })
  }

  eventClick(item:any){
    this.ejer = item
    this.form.controls.ejercicio_id.setValue(item.ejercicio_id);
  }
  tiempo(item:any){
    this.form.controls.hora.setValue(item);    
  }

  save(data:any){
    if(this.progress[this.progress.length-1]!=100){

      this.ejercicioService.create(data).pipe(
        finalize(() => {
          this.form.markAsPristine();
        })
        ).subscribe(
        data=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Dato registrado con Exito',
            // text: 'postivo',
            text: data.succes,
            showConfirmButton: false,
            timer: 1500
          });
        }
      )
      this.listTipoEjercicio(this.id);
      this.progreso();
    }
    else{
     Swal.fire({
       position: 'center',
       icon: 'warning',
       title: 'Ya completado',
       // text: 'postivo'
       showConfirmButton: false,
       timer: 1500
     });
    }

  }

  progreso(){
    if (this.form.controls.hora.value >= "00:30:00:00") {
      this.progress =[];
    this.ejercicioService.getProgress().subscribe(data=>{
      this.progress = data;    
    })
    }
  }
  

}
