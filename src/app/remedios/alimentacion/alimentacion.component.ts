import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlimentacionService } from 'src/app/core/services/alimentacion.service';

@Component({
  selector: 'app-alimentacion',
  templateUrl: './alimentacion.component.html',
  styleUrls: ['./alimentacion.component.scss']
})
export class AlimentacionComponent implements OnInit {

  alimentacion: any;
  form: FormGroup;

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
      salubable:['', Validators.required],
      fecha:['']
    });
  }

  listaAlimentacion() {
    this.alimentacionService.getAll().subscribe(data=>{
      this.alimentacion = data;
      console.log(this.alimentacion);
      
    })
  }

  eventClick(item){
      // this.form.controls.fecha.setValue(item);
  }

  // submit(data){
  //   this.alimentacionService.create(data);
  // }

}
