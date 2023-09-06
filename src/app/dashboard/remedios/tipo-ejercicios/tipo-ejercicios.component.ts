import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';
import { EjercicioService } from '../../../core/services/ejercicio.service';

@Component({
  selector: 'app-tipo-ejercicios',
  templateUrl: './tipo-ejercicios.component.html',
  styleUrls: ['./tipo-ejercicios.component.scss']
})
export class TipoEjerciciosComponent implements OnInit {
  id:any;
  ejercicio:any;
  form!: FormGroup;
  ejer:any;
  progress: any[]=[];
  minutos:any = 0;
  constructor(
    private route:ActivatedRoute,
    private ejercicioService:EjercicioService,
    private formBuilder: FormBuilder,
    private dataPipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .subscribe((paramMap: any) => {
      this.id = paramMap.get('id');
    })
    this.listTipoEjercicio(this.id);
    this.create();
    this.progreso()
  }


  create() {
    this.form = this.formBuilder.group({
      ejercicio_id: ['',],
      hora:[''],
      hora_inicio:[''],
      hora_fin:[''],
      otro:[''],
      fecha:[this.dataPipe.transform(Date.now(),'yyyy-MM-dd')],
      progreso:[''],
    })
  }

  listTipoEjercicio(id: any) {
    this.ejercicioService.getTipoEjercicio(id).subscribe(data=>{
        this.ejercicio = data;
    })
  }

  eventClick(item:any){
    this.ejer = item
    this.form.controls.ejercicio_id.setValue(item.ejercicio_id);

  }

  tiempo(item: any) {
    this.form.controls.hora.setValue(item);
    const minutos = this.convertirATiempo(item);
    this.minutos = minutos;
    if (this.id == 1) {

      if ( this.progress.length==0 && minutos >= 10 || minutos >= 20) {
        this.form.controls.progreso.setValue(30);
      }
      if(this.progress.length==0 && minutos>=30){
        this.form.controls.progreso.setValue(100);
      }

      if (this.progress[this.progress.length - 1]==30) {
        this.form.controls.progreso.setValue(30);
      }
      if (this.progress[this.progress.length - 1]==60) {
        this.form.controls.progreso.setValue(40);
      }

    }
  }

  convertirATiempo(tiempo: string): number {
    const partesTiempo = tiempo.split(':');
    const horas = parseInt(partesTiempo[0], 10);
    const minutos = parseInt(partesTiempo[1], 10);
    const segundos = parseInt(partesTiempo[2], 10);

    return minutos
  }

  save(data:any){
    console.log(this.minutos);

     if (this.progress[this.progress.length - 1]!=100 && this.minutos >= 10 ) {
      this.ejercicioService.create(data).pipe(
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

          this.listTipoEjercicio(this.id);
          this.progreso();
          this.minutos = 0;
        }
      )
     }
     else{
        if (this.minutos < 10) {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: '¡sigue avanzando!',
            // text: 'postivo',
            text: data.succes,
            showConfirmButton: false,
            timer: 1500
          });
          this.progreso();
          this.listTipoEjercicio(this.id);
        }
        else{
          Swal.fire({
            position: 'center',
            icon: 'info',
            title: '¡Felicitaciones sigue asi!',
            // text: 'postivo',
            text: data.succes,
            showConfirmButton: false,
            timer: 1500
          });
          this.progreso();
          this.listTipoEjercicio(this.id);
        }

    }
  }

  progreso(){
    this.progress =[];
    this.ejercicioService.getProgress().subscribe(data=>{
      this.progress = data;

      console.log('hola', this.progress);


    })
  }


}
