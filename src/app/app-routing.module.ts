import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUsuarioComponent } from './components/login-usuario/login-usuario.component';
import { VistaPrincipalComponent } from './components/vista-principal/vista-principal.component';
import { VistaHorariosComponent } from './components/vista-horarios/vista-horarios.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginUsuarioComponent },
  { path: 'inicio', component: VistaPrincipalComponent },
  { path: 'sesiones', component: VistaHorariosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
