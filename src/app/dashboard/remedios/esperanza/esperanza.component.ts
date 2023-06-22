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
      esperanza_id:['']
    })
  }

  evento(item:any){
    this.form.controls.esperanza_id.setValue(item);
      this.save(this.form.value);
}

  save(form:any){
    this.esperanzaService.create(form).pipe(
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
      }
    )
  }

  progreso(){
    this.progress = []
    this.esperanzaService.getProgress().subscribe(data=>{
      this.progress = data;
    })
  }

}
