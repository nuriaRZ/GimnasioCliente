import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Sesion } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SesionesService {

  constructor(private http: HttpClient) { }

  getListadoSesiones(idActividad: number): Observable<Sesion[]>{
    return this.http.get<Sesion[]>('/sesiones/?idActividad='+idActividad).pipe(
      //      tap(data => console.log(data)), // Si deseas hacer algo con los datos obtenidos, puedes hacerlo en esta línea
    );
  }
}
