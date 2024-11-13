import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Requerido por Angular Material
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'; // Agredado por david para la mask del telefono 10 digitos

//Este import es para los servicios HTTP
import { HttpClientModule } from '@angular/common/http';

// Importaciones de Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Otros componentes
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegistroScreenComponent } from './screens/registro-screen/registro-screen.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { RegistroNutriologoComponent } from './partials/registro-nutriologo/registro-nutriologo.component';
import { RegistroPacienteComponent } from './partials/registro-paciente/registro-paciente.component';
import { NutriologoScreenComponent } from './screens/nutriologo-screen/nutriologo-screen.component';
import { EstadisticasComponent } from './screens/estadisticas/estadisticas.component';
import { NgChartsModule } from 'ng2-charts';
import { EliminarUserModalComponent } from './modals/eliminar-user-modal/eliminar-user-modal.component';
import { EditarUserModalComponent } from './modals/editar-user-modal/editar-user-modal.component';
import { DietaTiempoComponent } from './partials/dieta-tiempo/dieta-tiempo.component';
import { DietaPorcionComponent } from './partials/dieta-porcion/dieta-porcion.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    RegistroScreenComponent,
    NavbarComponent,
    RegistroNutriologoComponent,
    RegistroPacienteComponent,
    NutriologoScreenComponent,
    EstadisticasComponent,
    EliminarUserModalComponent,
    EditarUserModalComponent,
    DietaTiempoComponent,
    DietaPorcionComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // Necesario para Angular Material
    MatFormFieldModule, // Módulo de formularios de Angular Material
    MatInputModule, // Módulo de inputs de Angular Material
    MatDialogModule, // Importa MatDialogModule aquí
    MatIconModule, //para los iconos
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    HttpClientModule,
    FormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    NgChartsModule,  
    NgxMaskDirective // Agredado por david para la mask del telefono 10 digitos
  ],
  providers: [
    provideNgxMask() // Agredado por david para la mask del telefono 10 digitos
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
