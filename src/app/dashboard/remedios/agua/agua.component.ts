import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';
import { AguaService } from '../../../core/services/agua.service';

@Component({
  selector: 'app-agua',
  templateUrl: './agua.component.html',
  styleUrls: ['./agua.component.scss']
})
export class AguaComponent implements OnInit {

  form!:FormGroup;
  agua!:any; 
  estado=true;

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
      agua_id:[''],
      fecha:[this.dataPipe.transform(Date.now(),'yyyy-MM-dd')],
      hora:[this.dataPipe.transform(Date.now(),'HH:mm:ss')]
    });
  }

  listaAgua() {
    this.aguaService.getAll().subscribe(data=>{
      this.agua = data;
      console.log(this.agua);
      
    })
  }

  evento(item:any, estado:any){
      this.form.controls.agua_id.setValue(item);
      // this.form.get('agua_id').setValue(item);

      if (estado) {      
        this.save(this.form.value);
      }
      this.estado = false      
  }

  save(form:any){
    this.aguaService.create(form).pipe(
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
    this.listaAgua();
    // this.nutricion=null;
  }

}
