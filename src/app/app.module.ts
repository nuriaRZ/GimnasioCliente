import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginUsuarioComponent } from './components/login-usuario/login-usuario.component';
import { DialogoGeneralComponent } from './components/dialogo-general/dialogo-general.component';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { VistaPrincipalComponent } from './components/vista-principal/vista-principal.component';
import { BarraHerramientasComponent } from './components/barra-herramientas/barra-herramientas.component';
import { ImagenUsuarioComponent } from './components/imagen-usuario/imagen-usuario.component';
import { VistaHorariosComponent } from './components/vista-horarios/vista-horarios.component';
import { TituloActividadComponent } from './components/titulo-actividad/titulo-actividad.component';

import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import {MatTable, MatTableModule} from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';






@NgModule({
  declarations: [
    AppComponent,
    LoginUsuarioComponent,
    DialogoGeneralComponent,
    VistaPrincipalComponent,
    BarraHerramientasComponent,
    ImagenUsuarioComponent,
    VistaHorariosComponent,
    TituloActividadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
    MatTooltipModule,
    MatGridListModule,
    MatTabsModule,
    MatTableModule,
    MatSnackBarModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
