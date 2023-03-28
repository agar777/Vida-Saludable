import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';
import { DescansoService } from '../../../core/services/descanso.service'

@Component({
  selector: 'app-descanso',
  templateUrl: './descanso.component.html',
  styleUrls: ['./descanso.component.scss']
})
export class DescansoComponent implements OnInit {

  descansos:any;
  form!:FormGroup
  hora:any;
  descanso:any;

  constructor(
    private descansoService:DescansoService,
    private formBuilder:FormBuilder,
    private datePipe:DatePipe
  ) { }

  ngOnInit(): void {
    this.hora= this.datePipe.transform(Date.now(),'hh:mm')
    // console.log(this.hora);
    
    this.listaDescanso();
    this.create();
  }

  create() {
    this.form = this.formBuilder.group({
      descanso:[''],
      fecha:[this.datePipe.transform(Date.now(),'yyyy-MM-dd')],
      hora:[''] 
    })
  }

  listaDescanso() {
    this.descansoService.getAll().subscribe(data=>{
      this.descansos = data;
    })
  }

  save(form:any){
    this.descansoService.create(form).pipe(
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
  }

  eventClick(item: any){
    this.descanso = item
  }
}
