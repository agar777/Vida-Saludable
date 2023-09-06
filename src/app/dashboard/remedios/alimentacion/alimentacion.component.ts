import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { AlimentacionService } from '../../../core/services/alimentacion.service';
import Swal from 'sweetalert2';
// import { NotificacionesFireService } from '../../../core/services/notificaciones-fire.service';

@Component({
  selector: 'app-alimentacion',
  templateUrl: './alimentacion.component.html',
  styleUrls: ['./alimentacion.component.scss'],
})
export class AlimentacionComponent implements OnInit {

  alimentacion!: any;
  hora:any;
  showCongratulation = true;
  form!: FormGroup;
  time = new Date();
  nutricion: any;
  progress: any[] = [];
  suma: any;
  constructor(
    private alimentacionService: AlimentacionService,
    private formBuilder: FormBuilder,
    private dataPipe: DatePipe
  ) {
    this.hora=this.dataPipe.transform(Date.now(),'HH:mm');

   }

  ngOnInit(): void {
    this.listaAlimentacion();
    this.create();
    this.progreso();

    if (this.progress[this.progress.length-1]==100) {
      setTimeout(() => {
        this.showCongratulation = false;
        console.log('Han pasado 10 segundos');
      }, 10000);
    }

  }



  create() {
    this.form = this.formBuilder.group({
      nutricion_id:[''],
      saludable:['', Validators.required],
      fecha:[this.dataPipe.transform(Date.now(),'yyyy-MM-dd')],
      hora:[this.dataPipe.transform(Date.now(),'HH:mm:ss')],
      progreso:['']
    });
  }

  listaAlimentacion() {
    this.alimentacionService.getAll().subscribe(data=>{
      this.alimentacion = data;
    })
  }

  eventClick(item: any){
      this.nutricion= item
      this.form.controls.nutricion_id.setValue(item.nutricion_id);
      if(item.nutricion_id!="4"){
        this.form.controls.progreso.setValue(item.progreso);
      }
      else{
        this.form.controls.progreso.setValue(5);
      }

      if(item.nutricion_id==4){
         this.form.controls.saludable.setValue("false");
      }
  }

  save(data:any){
    if(this.nutricion.nutricion_id==4){
      this.saveAlimentacion(data);
    }
   else{
    this.alimentacionService.disabledAlimentacion(this.nutricion.nutricion_id).subscribe(data1 =>{
      if(data1===null ){
          this.saveAlimentacion(data);
      }else{
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: '¡UPS!',
            text: 'Ya se realizo el registro',
          });
      }
    })
   }

    this.listaAlimentacion();
    this.progreso();
    this.nutricion=null;
  }

  saveAlimentacion(data:any){
    this.alimentacionService.create(data).pipe(
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
      }
    )
  }


  progreso(){
    this.alimentacionService.getProgress().subscribe(data=>{
      this.progress = data;
    })
  }


}
