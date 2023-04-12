import { Component, AfterViewInit, OnInit, Inject } from '@angular/core';
import { ConfService } from '../core/services/conf.service';
// import { AnyRecord } from 'dns';
//declare var require: any;

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  data:any;
  constructor(
    private conf: ConfService
  ) {

  }

  ngOnInit(): void {
    this.conf.getProgresoDiario().subscribe((data:any)=>{
      console.log(data);   
      this.data = data;   
    })   
    
  }
   
}
