import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // Requerido por Angular Material

//Este import es para los servicios HTTP
import { HttpClientModule } from '@angular/common/http';

// Importaciones de Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';

// Otros componentes
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegistroScreenComponent } from './screens/registro-screen/registro-screen.component';
import { FormsModule } from '@angular/forms';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { EstudianteScreenComponent } from './screens/estudiante-screen/estudiante-screen.component';
import { PropietarioScreenComponent } from './screens/propietario-screen/propietario-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    RegistroScreenComponent,
    HomeScreenComponent,
    EstudianteScreenComponent,
    PropietarioScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,  // Necesario para Angular Material
    MatFormFieldModule,       // Módulo de formularios de Angular Material
    MatInputModule,           // Módulo de inputs de Angular Material
    MatDialogModule, // Importa MatDialogModule aquí
    MatIconModule, //para los iconos
    MatButtonModule,
    MatSelectModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
