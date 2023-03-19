import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { AlimentacionService } from '../../../core/services/alimentacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alimentacion',
  templateUrl: './alimentacion.component.html',
  styleUrls: ['./alimentacion.component.scss']
})
export class AlimentacionComponent implements OnInit {

  alimentacion!: any;
  form!: FormGroup;
  time = new Date();
  nutricion!: any;

  constructor(
    private alimentacionService: AlimentacionService,
    private formBuilder: FormBuilder,
    private dataPipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.listaAlimentacion();
    this.create();
  }

  create() {
    this.form = this.formBuilder.group({
      nutricion_id:[''],
      saludable:['', Validators.required],
      fecha:[this.dataPipe.transform(Date.now(),'yyyy-MM-dd')],
      hora:[this.dataPipe.transform(Date.now(),'HH:mm:ss')],
      estado:['']
    });
  }

  listaAlimentacion() {
    this.alimentacionService.getAll().subscribe(data=>{
      this.alimentacion = data;
      console.log(this.alimentacion);
      
    })
  }

  eventClick(item: any){
    this.nutricion= item
    console.log(item);    
      this.form.controls.nutricion_id.setValue(item.nutricion_id);
      this.form.controls.estado.setValue(1);
  }

  save(data:any){
    this.alimentacionService.create(data).pipe(
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
    this.listaAlimentacion();
    this.nutricion=null;
  }

}
