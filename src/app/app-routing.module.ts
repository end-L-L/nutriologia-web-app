import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegistroScreenComponent } from './screens/registro-screen/registro-screen.component';
import { NgModule } from '@angular/core';
import { RegistroAdminComponent } from './partials/registro-admin/registro-admin.component';
import { RegistroNutriologoComponent } from './partials/registro-nutriologo/registro-nutriologo.component';
import { RegistroPacienteComponent } from './partials/registro-paciente/registro-paciente.component';

const routes: Routes = [
  { path: '', component: LoginScreenComponent, pathMatch: 'full' },
  { path: 'registro-usuarios', component: RegistroScreenComponent, pathMatch: 'full' },
  { path: 'login', component: LoginScreenComponent, pathMatch: 'full' },
  { path: 'registro-admin', component: RegistroAdminComponent, pathMatch: 'full' },
  { path: 'registro-nutriologo', component: RegistroNutriologoComponent, pathMatch: 'full' },
  { path: 'registro-paciente', component: RegistroPacienteComponent, pathMatch: 'full' },
  { path: 'registro-screen', component: RegistroScreenComponent, pathMatch: 'full' },
  { path: 'patients', loadChildren: () => import('./patients/patients.module').then((m) => m.PatientsModule), pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
