import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { AutenticadorJwtService } from '../../services/autenticador-jwt.service'; 
import { ComunicacionDeAlertasService } from '../../services/comunicacion-de-alertas.service';

/**
 * Decorador que especifica a esta clase Typescript como un componente, con su selector
 * y su cara visible (html + estilos)
 */
@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})

/**
 * Este componente se ocupa de permitir que podamos autenticar a un usuario
 */
export class LoginUsuarioComponent implements OnInit {

  // Propiedades de la clase
  loginForm: FormGroup; // Permite tener un objeto linkado a los campos del formulario de autenticación
  ocultarPassword: boolean = true; // Utilizado para conocer si se muestra u oculta el contenido del campo password


  /**
   * Le pido al inyector de código que genere objetos de determinados tipos, útiles
   */
  constructor(private usuarioService: UsuarioService, private router: Router, 
    private autenticadorJwtService: AutenticadorJwtService, private comunicacionAlertas: ComunicacionDeAlertasService) { }

  /**
   * Hook al momento de inicialización del componente
   */
  ngOnInit(): void {
    // Inicializo el objeto FormGroup, es la base para usar formularios reactivos, en los que la validación
    // y el control son muy fáciles de realizar.
    this.loginForm = new FormGroup({
      usuario: new FormControl ('nuria', [Validators.required, Validators.minLength(4)]),
      password: new FormControl ('1234', [Validators.required])
    });
  }

  /**
   * Método que autentica un usuario con los valores expuestos en el formulario del template
   */
  autenticaUsuario() {
    
    this.comunicacionAlertas.abrirDialogCargando();
    
    this.usuarioService.autenticaUsuario(this.loginForm.controls.usuario.value,
      this.loginForm.controls.password.value).subscribe(data => {
        if (data.jwt != undefined) {
          this.autenticadorJwtService.almacenaJWT(data.jwt); 
          this.router.navigate(['/inicio']); 
          this.comunicacionAlertas.cerrarDialogo(); 
          this.usuarioService.emitirNuevoCambioEnUsuarioAutenticado(); 
        } 
        else {
          this.comunicacionAlertas.abrirDialogError('El usuario y contraseña introducidos no permiten el acceso');
        }
      });
  }

}
