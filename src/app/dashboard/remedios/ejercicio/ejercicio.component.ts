import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EjercicioService } from '../../../core/services/ejercicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.component.html',
  styleUrls: ['./ejercicio.component.scss']
})
export class EjercicioComponent implements OnInit {

  ejercicio!: any;
  form!: FormGroup;
  time = new Date();
  deporte!: any;

  constructor(
    private ejercicioService: EjercicioService,
    private formBuilder: FormBuilder,
    private dataPipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.listaEjercicio();
    this.create();
  }

  create() {
    this.form = this.formBuilder.group({
      ejercicio_id:[''],
      fecha:[this.dataPipe.transform(Date.now(),'yyyy-MM-dd')],
      hora:[this.dataPipe.transform(Date.now(),'HH:mm:ss')]
    });
  }

  listaEjercicio() {
    this.ejercicioService.getAll().subscribe(data=>{
      this.ejercicio = data;
      console.log(this.ejercicio);

    })
  }

  eventClick(item:any){
    this.deporte= item
    console.log(item);
      this.form.controls.ejercicio_id.setValue(item.ejercicio_id);
    
  }

  save(data:any){
    const response=this.ejercicioService.create(data);
    console.log(data);
    console.log(response);

  }

}
