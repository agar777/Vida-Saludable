import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';
import { LuzSolarService } from '../../../core/services/luz-solar.service';

@Component({
  selector: 'app-luz-solar',
  templateUrl: './luz-solar.component.html',
  styleUrls: ['./luz-solar.component.scss']
})
export class LuzSolarComponent implements OnInit {

  form!:FormGroup;
  progress: any[] = [];
  horario: any;
  hora:any;

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private luzSolarService:LuzSolarService
  ) { }

  ngOnInit(): void {
    this.hora=this.datePipe.transform(Date.now(),'HH:mm');
    this.create();
    this.progreso();
    this.horarios();
  }

  create() {
    this.form = this.formBuilder.group({
      fecha:[this.datePipe.transform(Date.now(),'yyyy-MM-dd')],
      hora_inicio:[this.datePipe.transform(Date.now(),'hh:mm')],
      hora:[''],
      luzSolar_id:['']
    })
  }

  save(form:any){
   if(this.progress[this.progress.length-1]!=100){
    this.luzSolarService.create(form).pipe(
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

        this.progreso();        
      }
    )
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

  tiempo(item:any){
    this.form.controls.hora.setValue(item);    
  }

  progreso(){
    this.luzSolarService.getProgress().subscribe(data=>{
      this.progress = data;          
    })
  }
  
  horarios(){
    this.progress = []
    this.luzSolarService.horario().subscribe(data=>{
      this.horario = data;
    })
  }
  
}
