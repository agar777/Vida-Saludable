import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';
import { EsperanzaService } from '../../../core/services/esperanza.service';

@Component({
  selector: 'app-esperanza',
  templateUrl: './esperanza.component.html',
  styleUrls: ['./esperanza.component.scss']
})
export class EsperanzaComponent implements OnInit {

  form!: FormGroup;
  progress:any[]=[]

  constructor(
    private formBuilder:FormBuilder,
    private esperanzaService: EsperanzaService,
    private datePipe:DatePipe
  ) { }

  ngOnInit(): void {
    this.create();
    this.progreso()
  }

  create() {
     this.form = this.formBuilder.group({
      fecha:[this.datePipe.transform(Date.now(),'yyyy-MM-dd')],
      hora:[this.datePipe.transform(Date.now(),'hh:mm')],
      orar:[''],
      biblia:[''],
      pedido_oracion:['']    
    })
  }

  save(form:any){
    if(this.progress[this.progress.length-1]!=99){
    this.esperanzaService.create(form).pipe(
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

  progreso(){
    this.progress = []
    this.esperanzaService.getProgress().subscribe(data=>{
      this.progress = data;        
    })
  }

}
