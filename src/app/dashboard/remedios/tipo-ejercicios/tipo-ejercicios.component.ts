import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EjercicioService } from '../../../core/services/ejercicio.service';

@Component({
  selector: 'app-tipo-ejercicios',
  templateUrl: './tipo-ejercicios.component.html',
  styleUrls: ['./tipo-ejercicios.component.scss']
})
export class TipoEjerciciosComponent implements OnInit {
  id:any;
  ejercicio:any;
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
      console.log(this.id);
      
    })

    this.listTipoEjercicio(this.id);

  }

  listTipoEjercicio(id: any) {
    this.ejercicioService.getTipoEjercicio(id).subscribe(data=>{
        this.ejercicio = data;
        console.log(this.ejercicio);
        
    })
  }

}
