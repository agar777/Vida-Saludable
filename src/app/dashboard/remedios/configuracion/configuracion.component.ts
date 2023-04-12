import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

  desayuno = [
    {'hora':'04'},
    {'hora':'05'},
    {'hora':'06'},
    {'hora':'07'},
    {'hora':'08'},
    {'hora':'09'},
  ]

  almuerzo = [
    {'hora':'12'},
    {'hora':'13'},
    {'hora':'14'},
    {'hora':'15'},
  ]

  cena=[
    {'hora':'17'},
    {'hora':'18'},
    {'hora':'19'},
    {'hora':'20'},
    {'hora':'21'},
  ]

  despertar = [
    {'hora': '04'},
    {'hora': '05'},
    {'hora': '06'},
    {'hora': '07'},
    {'hora': '08'},
    {'hora': '09'},
  ]

  descansar = [
    {'hora': '20'},
    {'hora': '21'},
    {'hora': '22'},
    {'hora': '23'},
    {'hora': '00'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
