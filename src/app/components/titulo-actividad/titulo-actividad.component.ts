import { Component, Input } from '@angular/core';
import { Actividad } from '../../interfaces/interfaces';


@Component({
  selector: 'app-titulo-actividad',
  templateUrl: './titulo-actividad.component.html',
  styleUrls: ['./titulo-actividad.component.css']
})
export class TituloActividadComponent{
  
  @Input('actividad') actividad: Actividad;
  @Input('width') width: number;
  @Input('height') height: number;

  constructor() { }

 

}
