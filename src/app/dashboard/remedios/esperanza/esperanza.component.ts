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

  constructor(
    private formBuilder:FormBuilder,
    private esperanzaService: EsperanzaService,
    private datePipe:DatePipe
  ) { }

  ngOnInit(): void {
    this.create();
  }

  create() {
     this.form = this.formBuilder.group({
      fecha:[this.datePipe.transform(Date.now(),'yyyy-MM-dd')],
      hora:[''],
      orar:[''],
      pedido_oracion:['']    
    })
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
          title: 'Dato registrado con Exito',
          // text: 'postivo',
          text: data.succes,
          showConfirmButton: false,
          timer: 1500
        });
      }
    )
  }

}
