import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/interfaces';
import { Reserva } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private http: HttpClient) { }

  nuevaReserva (sesion: number, usuario: number, fecha: Date, activa: boolean): Observable<Reserva>{
     // Construyo un array vacío de tipo number
    // Para cada usuario recibido, tomo su "id" y lo agrego al array
    
    // Construyo un objeto para enviar al servidor
    var dto = {
      'idUsuario': usuario,
      'idSesion': sesion,
      'activa': activa,
      'fecha': fecha
    };
    // realizo la petición y devuelvo el Observable
    return this.http.put<Reserva>('/reserva/nueva', dto);
  }
}
