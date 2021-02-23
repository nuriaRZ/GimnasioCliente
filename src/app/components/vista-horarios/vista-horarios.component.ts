import { Component, Inject, OnInit } from '@angular/core';
import { Sesion, Usuario } from '../../interfaces/interfaces';
import { SesionesService } from '../../services/sesiones.service';
import { Actividad } from '../../interfaces/interfaces';
import { ActividadService } from '../../services/actividad.service';
import { ComunicacionDeAlertasService } from '../../services/comunicacion-de-alertas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Horario } from '../../interfaces/interfaces';
import { HorarioService } from '../../services/horario.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { ReservaService } from '../../services/reserva.service';



@Component({
  selector: 'app-vista-horarios',
  templateUrl: './vista-horarios.component.html',
  styleUrls: ['./vista-horarios.component.css']
})
export class VistaHorariosComponent implements OnInit {
  nombresDeColumnas: string[] = ['id', 'horario', 'actividad', 'plazas', 'dificultad', 'reservar']
  actividadInicio: Actividad;
  dataSourceTabla;
  horario: Horario;
  links = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  fechaActual;
  fechaNueva;
  usuarioAutenticado: number = null;
  dias: number = 2;

  constructor(@Inject(MAT_DIALOG_DATA) public actividad: Actividad, private sesionesService: SesionesService, private comunicacion: ComunicacionDeAlertasService,
    private usuarioService: UsuarioService, private actividadService: ActividadService,
     private router: Router, private horarioService: HorarioService, private dialogRef: MatDialogRef<VistaHorariosComponent>,
     private reservaService: ReservaService, private comunicacionAlertas : ComunicacionDeAlertasService) { }

  ngOnInit(): void {
    this.getUsuarioAutenticado();
    this.getFechaActual();
    this.actividadService.getActividad(this.actividad.id).subscribe(actividadObtenida =>{
      this.actividadInicio = actividadObtenida;
      this.sesionesService.getListadoSesiones(this.actividadInicio.id).subscribe(data => {
        console.log(data);        
        this.dataSourceTabla = new SesionDataSource(this.sesionesService, this.actividadInicio.id);
      });
    })
  }   
    
    getUsuarioAutenticado(){
      this.usuarioService.getUsuarioAutenticado().subscribe(usuario =>
        this.usuarioAutenticado = usuario.id);
    }
      
    

      cargarHorario(id: number){
         this.horarioService.getHorario(id).subscribe(horarioObtenido => {
         this.horario = horarioObtenido;
          
        });
      } 


      getFechaActual(){
        this.fechaActual = new Date();        
        return this.fechaActual;
      }

      getDiaFechaActual(fecha: Date){
       fecha.getDay(); 
       switch (fecha.getDay()) {
         case 1:
           return "Lunes";
           break;
          case 2:
          return "Martes";
          break;  
          case 3:
            return "Miércoles";
            break;

          case 4:
            return "Jueves";
            break;

          case 5:
          return "Viernes";
          break;

          case 6:
          return "Sábado";
          break;

          case 7:
          return "Domingo";
          break;
        
       }
      }

      ObtenerDiasSiguientesAFechaActual(fecha: Date){
        fecha.setDate(fecha.getDate() + 1)
        return fecha;
      }
      Obtener2DiasSiguientesAFechaActual(fecha: Date){
        fecha.setDate(fecha.getDate() + 2)
        return fecha;
      }

      cerrarVentana(){
        this.dialogRef.close();
      }

      reservar(sesion: number, usuario: number, fecha: Date){
        this.reservaService.nuevaReserva(sesion, usuario, fecha, true).subscribe(resultado => {
          if (resultado == null) {
            this.comunicacionAlertas.mostrarSnackBar('Error al reservar. Inténtelo más tarde.')
          }
          else {
            this.comunicacionAlertas.mostrarSnackBar('Reserva realizada con éxito');
            this.dialogRef.close();
          }
         })
      }
}

export class SesionDataSource extends DataSource<any> {
  constructor(private sesionesService: SesionesService, private id: number) {
    super();
  }
  connect(): Observable<Sesion[]>{
    return this.sesionesService.getListadoSesiones(this.id);
  }
  disconnect(){}
}
