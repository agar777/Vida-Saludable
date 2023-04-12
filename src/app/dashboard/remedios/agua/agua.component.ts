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
  progress: any;
  count: any;
  
  constructor(
    private aguaService: AguaService,
    private formBuilder: FormBuilder,
    private dataPipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.listaAgua();
    this.create();
    this.progreso();
    this.cantidadVasos()
  }
  cantidadVasos() {
    this.aguaService.cantidadVasos().subscribe(data=>{
      this.count = data;
      
    })
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
      
    })
  }

  evento(item:any){
      this.form.controls.agua_id.setValue(item);
        this.save(this.form.value);   
  }

  save(form:any){
   if(this.progress[this.progress.length-1]!=100){
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
    this.progreso();
    this.cantidadVasos();
  }
  else{
   Swal.fire({
     position: 'center',
     icon: 'warning',
     title: 'Ya completado',
     // text: 'postivo'
     showConfirmButton: false,
     timer: 1500
   });
  }
    // this.nutricion=null;
  }

  progreso(){
    this.progress=[]
    this.aguaService.getProgress().subscribe(data=>{
      this.progress = data;          
    })
  }

}
