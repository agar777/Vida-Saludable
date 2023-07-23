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
  esperanza: any;
  showCongratulation: boolean = true;

  constructor(
    private formBuilder:FormBuilder,
    private esperanzaService: EsperanzaService,
    private datePipe:DatePipe
  ) { }

  ngOnInit(): void {
    this.create();
    this.getAll();
    this.progreso()

  }

  getAll() {
    this.esperanzaService.getAll().subscribe(data=>{
      this.esperanza = data;
    })
  }

  create() {
     this.form = this.formBuilder.group({
      fecha:[this.datePipe.transform(Date.now(),'yyyy-MM-dd')],
      hora:[this.datePipe.transform(Date.now(),'hh:mm')],
      esperanza_id:[''],
      progreso:['']
    })
  }

  evento(item:any){
    this.form.controls.esperanza_id.setValue(item);
    if (this.progress[this.progress.length-1]==100) {
       this.form.controls.progreso.setValue(0);
    }
    else{
      this.form.controls.progreso.setValue(25);
    }
    this.save(this.form.value);
}

  save(form:any){
    if(this.progress[this.progress.length-1]!=100){
      this.esperanzaService.create(form).pipe(
        finalize(() => {
          this.form.markAsPristine();
        })
        ).subscribe(
        data=>{
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Registrado',
              // text: 'postivo',
              text: data.succes,
              showConfirmButton: false,
              timer: 1500
            });
          this.progreso();
        }
      )
    }else{
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Felicidades, continua Orando',
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

      console.log(this.progress[this.progress.length-1]);


      if (this.progress.length > 0 && this.progress[this.progress.length - 1] === 100) {
        setTimeout(() => {
          this.showCongratulation = false;
          console.log('Han pasado 10 segundos');
        }, 10000);
      }
    })
  }

}
