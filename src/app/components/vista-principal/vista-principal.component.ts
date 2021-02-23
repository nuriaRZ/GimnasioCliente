import { Component, OnInit } from '@angular/core';
import { ComunicacionDeAlertasService } from '../../services/comunicacion-de-alertas.service';
import { DialogTypes } from '../dialogo-general/dialog-data-type';
import { AutenticadorJwtService } from '../../services/autenticador-jwt.service';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { Actividad } from '../../interfaces/interfaces';
import { ActividadService } from '../../services/actividad.service';
import { SesionesService } from '../../services/sesiones.service';
import { Sesion } from '../../interfaces/interfaces';
import { VistaHorariosComponent } from '../vista-horarios/vista-horarios.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-vista-principal',
  templateUrl: './vista-principal.component.html',
  styleUrls: ['./vista-principal.component.css']
})
export class VistaPrincipalComponent implements OnInit {
  actividadInicio: Actividad;
  usuarioAutenticado: Usuario;
  listaActividades: Actividad[];
  listaSesiones: Sesion[];
  constructor(private comunicacionAlertasService: ComunicacionDeAlertasService,
    private autenticacionPorJWT: AutenticadorJwtService,
    private router: Router,
    private usuariosService: UsuarioService, private actividadService: ActividadService,
    private sesionesService: SesionesService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.usuariosService.cambiosEnUsuarioAutenticado.subscribe(nuevoUsuarioAutenticado => {
      this.usuarioAutenticado = nuevoUsuarioAutenticado;
    });

    this.actividadService.getListadoActividades().subscribe(data => {
      console.log(data);
      this.listaActividades = data;
      this.listaActividades.forEach(actividad => {
        this.actividadInicio = actividad;
        
      })
    });

    
  }  
  getIdActividad(id: number){
    this.actividadService.getActividad(id).subscribe(data => {
      this.router.navigate(['sesiones']);
      
    });
  }

  seleccionarActividad(actividad: Actividad){
    const dialogRef = this.dialog.open(VistaHorariosComponent, {
      width: '100%',
      height: '90%',
      data: actividad,
    });
    dialogRef.afterClosed().subscribe(
     
    )
  }

  

}
