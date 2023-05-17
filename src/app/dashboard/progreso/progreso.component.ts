import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ConfService } from '../../core/services/conf.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-progreso',
  templateUrl: './progreso.component.html',
  styleUrls: ['./progreso.component.scss']
})
export class ProgresoComponent implements OnInit {

  fecha = new FormControl(this.datePipe.transform(Date.now(),'yyyy-MM-dd'),[])
  data: any[] =[];

  constructor(
    private conf : ConfService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {

    this.getProgreso(this.datePipe.transform(Date.now(),'yyyy-MM-dd'));

    this.fecha.valueChanges.pipe
      (
        debounceTime(400),
        distinctUntilChanged(),
        
      )
    .subscribe(data=>{
      this.getProgreso(this.datePipe.transform(data,'yyyy-MM-dd'));
    })


  }

  getProgreso(fecha:any) {
    this.data = []
    this.conf.getProgresoAll(fecha).subscribe(data=>{
        this.data = data
        console.log('fechas',this.data);        
    })
  }

}
