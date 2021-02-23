import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Horario } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  constructor(private http: HttpClient) { }
  getListadoHorario(): Observable<Horario[]> {
    return this.http.get<Horario[]>('/horario/all');
  }

  getHorario(id: number): Observable<Horario> {
    var url= '/horario/get?id=' + id;
    return this.http.get<Horario>(url);
  }

  

 
}
