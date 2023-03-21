import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cronometro',
  templateUrl: './cronometro.component.html',
  styleUrls: ['./cronometro.component.scss']
})
export class CronometroComponent implements OnInit {

  centesimas:any = '0'+ 0;
  segundos:any = '0'+ 0;
  minutos:any = '0'+ 0;
  horas:any = '0'+ 0;

  startTimer:any;
  running= false

  @Output() hora = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    
  }

  start():void{
    if (!this.running) {
      this.running=true;
      this.startTimer=setInterval(() => {
        this.centesimas++;
        this.centesimas = this.centesimas<10?'0'+this.centesimas: this.centesimas;

        if (this.centesimas===100) {
            this.segundos++;
            this.segundos = this.segundos<10?'0'+this.segundos: this.segundos
            this.centesimas ='0'+0      
        }
        if (this.segundos===60) {
          this.minutos++;
          this.minutos = this.minutos<10?'0'+this.minutos: this.minutos
          this.segundos ='0'+0      
        }
        if (this.minutos===60) {
          this.horas++;
          this.horas = this.horas<10?'0'+this.horas: this.horas
          this.minutos ='0'+0      
        }      
     },10)
    }else{
      this.stop();
    };
    this.tiempo()
  }

  stop():void {
   clearInterval(this.startTimer);
   this.running=false;
  }

  reset():void{
    clearInterval(this.startTimer);
    this.running=false;
    this.horas = this.minutos=this.segundos=this.centesimas = '0'+0
  }

  tiempo(){
    let data = this.horas+':'+this.minutos+':'+this.segundos+':'+this.centesimas    
    this.hora.emit(data)
  }
 

}
