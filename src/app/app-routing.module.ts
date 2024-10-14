import { RouterModule, Routes } from "@angular/router";
import { LoginScreenComponent } from "./screens/login-screen/login-screen.component";
import { RegistroScreenComponent } from "./screens/registro-screen/registro-screen.component";
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { NgModule } from "@angular/core";
import { PropietarioScreenComponent } from "./screens/propietario-screen/propietario-screen.component";
//import { SobreMiComponent } from "./screens/sobre-mi/sobre-mi.component";
import { RegistroPropiedadComponent } from './partials/registro-propiedad/registro-propiedad.component';





const routes: Routes = [

  {path: '', component: LoginScreenComponent, pathMatch: 'full'},
  {path: 'registro-usuarios', component: RegistroScreenComponent, pathMatch: 'full'},
  { path: 'home', component: HomeScreenComponent, pathMatch: 'full' },
  { path: 'propietarios', component: PropietarioScreenComponent, pathMatch: 'full' },
  //{ path: 'sobre-mi', component: SobreMiComponent, pathMatch: 'full' },
  { path: 'login', component: LoginScreenComponent, pathMatch: 'full' },
  { path: 'registro-propiedad', component: RegistroPropiedadComponent, pathMatch: 'full' },




]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
