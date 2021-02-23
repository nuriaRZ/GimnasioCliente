export interface DatosConJWT{
    jwt: string;
}



export interface Usuario {
    id: number;
    usuario: string;
    password: string;
    nombre: string;
    apellidos: string;
    direccion: string;
    telefono: string;
    activo: boolean;    
    imagen: string;
    email: string;
    fechaNacimiento: Date;
  }

export interface Actividad {
    id: number;
    nombre: string;
    descripcion: string;    
    lugar: string;
    monitor: string;
    imagen: string;
}  

export interface Sesion {
    id: number;
    horario: Horario;
    idActividad: number;
    plazas: number;
    dificultad: string;
}

export interface Horario {
    id: number;
    horaInicio: string;
    horaFin: string;
}

export interface Reserva{
    id: number;
    fecha: Date;
    activa: boolean;
    sesion: Sesion;
    usuario: Usuario;
}

