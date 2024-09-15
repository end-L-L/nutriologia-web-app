import { RouterModule, Routes } from "@angular/router";
import { LoginScreenComponent } from "./screens/login-screen/login-screen.component";
import { RegistroScreenComponent } from "./screens/registro-screen/registro-screen.component";
import { NgModule } from "@angular/core";




const routes: Routes = [

  {path: '', component: LoginScreenComponent, pathMatch: 'full'},
  {path: 'registro-usuarios', component: RegistroScreenComponent, pathMatch: 'full'},

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
