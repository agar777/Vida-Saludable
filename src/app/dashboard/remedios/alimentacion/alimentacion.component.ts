import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { AlimentacionService } from '../../../core/services/alimentacion.service';
import Swal from 'sweetalert2';
import { NotificacionesFireService } from '../../../core/services/notificaciones-fire.service';

@Component({
  selector: 'app-alimentacion',
  templateUrl: './alimentacion.component.html',
  styleUrls: ['./alimentacion.component.scss'],
})
export class AlimentacionComponent implements OnInit {

  alimentacion!: any;
  hora:any;
  form!: FormGroup;
  time = new Date();
  nutricion!: any;
  progress: any[] = [];
  suma: any;
  constructor(
    private alimentacionService: AlimentacionService,
    private formBuilder: FormBuilder,
    private dataPipe: DatePipe,
    private fireNoti: NotificacionesFireService
  ) {
    this.hora=this.dataPipe.transform(Date.now(),'HH:mm');

        switch (this.hora) {
          case '08:00':
              this.fireNoti.sendPushNotification("Hora de Desayunar","Llego la hora de un desayuno saludable")
            break;
            case '12:30':
              this.fireNoti.sendPushNotification("Hora de Almorzar","Llego la hora de un almuerzo saludable")
            break;
            case '18:30':
              this.fireNoti.sendPushNotification("Hora de Cenar","Llego la hora de una cena saludable")
            break;
          default:
            break;
        }

   }

  ngOnInit(): void {
    this.listaAlimentacion();
    this.create();
    this.progreso();
    this.fireNoti.receiveMessages();

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
      if(item.nutricion_id!=4){
        this.form.controls.progreso.setValue(item.progreso);
      }

      if(item.nutricion_id==4){
         this.form.controls.saludable.setValue("false");
      }
  }

  save(data:any){
    // if(this.progress[this.progress.length-1]!=100){

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
    this.progreso();
    this.nutricion=null;
  }
  // else{
  //  Swal.fire({
  //    position: 'center',
  //    icon: 'warning',
  //    title: 'Ya completado',
  //    // text: 'postivo'
  //    showConfirmButton: false,
  //    timer: 1500
  //  });   
  // }
  

  progreso(){
    this.progress=[]
    this.alimentacionService.getProgress().subscribe(data=>{
      this.progress = data;          
    })
  }


}
