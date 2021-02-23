import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Actividad } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  constructor(private http: HttpClient) { }

  getListadoActividades(): Observable<Actividad[]> {
    return this.http.get<Actividad[]>('/inicio').pipe(
//      tap(data => console.log(data)), // Si deseas hacer algo con los datos obtenidos, puedes hacerlo en esta línea
    );
  }

  //obtener datos de la actividad a partir del id
  getActividad(id: number): Observable<Actividad> {
    var url= '/actividad/get?id=' + id;
    console.log("hola"+id)
    console.log(url);
    return this.http.get<Actividad>(url);
  }

  

}

