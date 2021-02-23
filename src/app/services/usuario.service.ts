import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DatosConJWT } from '../interfaces/interfaces';
import { Usuario } from '../interfaces/interfaces';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioAutenticado: Usuario;
  @Output()
  cambiosEnUsuarioAutenticado = new EventEmitter<Usuario>();
  constructor(private http: HttpClient) { }

  autenticaUsuario (usuario: string, password: string) : Observable<DatosConJWT> {
    const md5 = new Md5(); // Creo un objeto que permite codificar en MD5
    var jsonObject = {
      usuario: usuario,
      password: md5.appendStr(password).end().toString()  // Codifico en MD5 el password recibido
    };

    return this.http.post<DatosConJWT>('/usuario/autentica', jsonObject).pipe(
      tap(data => { 
        console.log('Desde tap miro los datos recibidos: ' + data["jwt"]);
      })
    ); 

  }

  getUsuarioAutenticado(incluirImagen: boolean = false): Observable<Usuario> {
    return this.http.get<Usuario>('/usuario/getAutenticado?imagen=' + incluirImagen)
    .pipe(
      tap(usuarioAutenticado => {
        // En la condición del if intento detectar varios casos que provocan un cambio en 
        // el usuario autenticado
        if ( (this.usuarioAutenticado == null && usuarioAutenticado != null) || // No había usuario autenticado y ahora sí lo hay - Autenticación
          (this.usuarioAutenticado != null && usuarioAutenticado == null) ||  // Había usuario autenticado y ya no lo hay - Cierre de sesión
          (this.usuarioAutenticado != null && usuarioAutenticado == null && this.usuarioAutenticado.id != usuarioAutenticado.id) ) { // Cambio de usuario autenticado
            this.emitirNuevoCambioEnUsuarioAutenticado();
            this.usuarioAutenticado = usuarioAutenticado;
          }
      })
    );
  }

  emitirNuevoCambioEnUsuarioAutenticado () {
    this.getUsuarioAutenticado(true).subscribe(usuarioAutenticado => {
      this.cambiosEnUsuarioAutenticado.emit(usuarioAutenticado);
    });
  }


}
