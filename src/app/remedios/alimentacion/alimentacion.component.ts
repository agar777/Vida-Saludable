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
  time = new Date();
  nutricion: any;

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
      saludable:[''],
      fecha:[this.dataPipe.transform(Date.now(),'yyyy-MM-dd')],
      hora:[this.dataPipe.transform(Date.now(),'HH:mm:ss')]
    });
  }

  listaAlimentacion() {
    this.alimentacionService.getAll().subscribe(data=>{
      this.alimentacion = data;
      console.log(this.alimentacion);
      
    })
  }

  eventClick(item){
    this.nutricion= item
    console.log(item);    
      this.form.controls.nutricion_id.setValue(item.nutricion_id);
  }

  save(data){
    const response=this.alimentacionService.create(data);
    console.log(data);
    console.log(response);
    
  }

}
