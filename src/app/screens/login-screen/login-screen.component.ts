import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacadeService } from 'src/services/facade.service';


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

  /*public login(){
    this.errors = [];

    this.errors = this.FacadeService.validarLogin(this.username, this.password);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    this.FacadeService.validarLogin(this.username, this.password).subscribe(
      (response)=>{
        this.FacadeService.saveUserData(response);
        this.router.navigate(["home"]);
      }, (error)=>{
        alert("No se pudo iniciar sesión");
      }
    );
  }*/

  public registrar(){
    this.router.navigate(["registro-usuarios"]);
  }
}
