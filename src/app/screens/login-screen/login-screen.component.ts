import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacadeService } from 'src/services/facade.service';
declare var $:any;

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {

  public username: string = "";
  public password: string = "";
  public type: string = "password";
  public errors: any = {};

  constructor(
    private router: Router,
    private facadeService: FacadeService,
  ){}

  ngOnInit(): void {}

<<<<<<< HEAD
  public login(){
    //Validar
=======
  }

  public login(){
>>>>>>> 98cfb0ff86e38a112bc6d123f9185bb5ad20734e
    this.errors = [];

    this.errors = this.facadeService.validarLogin(this.username, this.password);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
<<<<<<< HEAD
    //Si pasa la validación ir a la página de home
    this.facadeService.login(this.username, this.password).subscribe(
=======
    this.facadeService.validarLogin(this.username, this.password).subscribe(
>>>>>>> 98cfb0ff86e38a112bc6d123f9185bb5ad20734e
      (response)=>{
        this.facadeService.saveUserData(response);
        this.router.navigate(["home"]);
      }, (error)=>{
        alert("No se pudo iniciar sesión");
      }
    );
  }

  public registrar(){
    this.router.navigate(["registro-usuarios"]);
  }

  public showPassword(){
    if(this.type == "password"){
      //Muestra la contraseña
      $("#show-password").addClass("show-password");
      $("#show-password").attr("data-password", true);
      this.type = "text";
    }else if(this.type == "text"){
      //Oculta la contraseña
      $("#show-password").removeClass("show-password");
      $("#show-password").attr("data-password", false);
      this.type = "password";
    }

  }
}
