import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  progress:any[]=[]
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
      hora_inicio:['',Validators.required],
      hora_fin:['',Validators.required],
      luzSolar_id:['']
    })
  }

  save(form:any){
    this.luzSolarService.create(form).pipe(
      finalize(() => {
        this.form.markAsPristine();
      })
      ).subscribe(
      data=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Felicitaciones por registrar y cumplir con tu progreso!',
          // text: 'postivo',
          text: data.succes,
          showConfirmButton: false,
          timer: 1500
        });

        this.progreso();
        this.horarios();
      }
    )
  }

  tiempo(item:any){
    this.form.controls.hora.setValue(item);
  }

  progreso(){
    // if (this.form.controls.hora.value >= "00:25:00:00") {

      this.luzSolarService.getProgress().subscribe(data=>{
        this.progress = data;
        console.log(this.progress);

      })
    // }
  }

  horarios(){
    this.luzSolarService.horario().subscribe(data=>{
      this.horario = data;
    })
  }

}
