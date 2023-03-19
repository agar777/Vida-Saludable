import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AguaService } from '../../../core/services/agua.service';

@Component({
  selector: 'app-agua',
  templateUrl: './agua.component.html',
  styleUrls: ['./agua.component.scss']
})
export class AguaComponent implements OnInit {

  form!:FormGroup;
  agua!:any; 

  constructor(
    private aguaService: AguaService,
    private formBuilder: FormBuilder,
    private dataPipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.listaAgua();
    this.create();
  }

  create() {
    this.form = this.formBuilder.group({
      nutricion_id:[''],
      fecha:[this.dataPipe.transform(Date.now(),'yyyy-MM-dd')],
      hora:[this.dataPipe.transform(Date.now(),'HH:mm:ss')],
      estado:['']
    });
  }

  listaAgua() {
    this.aguaService.getAll().subscribe(data=>{
      this.agua = data;
      console.log(this.agua);
      
    })
  }

  evento(item:any){
    // this.aguas= item
    console.log(item);    
      this.form.controls.nutricion_id.setValue(item.nutricion_id);
      this.form.controls.estado.setValue(1);
  }

}
