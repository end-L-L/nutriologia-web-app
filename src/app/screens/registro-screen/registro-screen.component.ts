import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { UsuariosService } from 'src/services/usuarios.service';
import { FacadeService } from 'src/services/facade.service';
declare var $:any;


@Component({
  selector: 'app-registro-screen',
  templateUrl: './registro-screen.component.html',
  styleUrls: ['./registro-screen.component.scss']
})
export class RegistroScreenComponent {

  //Para contraseñas
public hide_1: boolean = false;
public hide_2: boolean = false;
public inputType_1: string = 'password';
public inputType_2: string = 'password';
public password: string = "";

public usuario:any= {};
public token: string = "";
public errors:any={};
public editar:boolean = false;
public idUser: Number = 0;

constructor(
  private router: Router,
  private activatedRoute: ActivatedRoute,
  private location: Location,
  public dialog: MatDialog,
  private usuariosService: UsuariosService,
  private facadeService: FacadeService,
){}



public regresar(){
  this.location.back();
}

  //Funciones para password
  showPassword()
  {
    if(this.inputType_1 == 'password'){
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }
    else{
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  showPwdConfirmar()
  {
    if(this.inputType_2 == 'password'){
      this.inputType_2 = 'text';
      this.hide_2 = true;
    }
    else{
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }

  //para el select
  private _roles: any[] = [
    { value: '1', viewValue: 'Propietario' },
    { value: '2', viewValue: 'Estudiante' }
  ];
  public get roles(): any[] {
    return this._roles;
  }
  public set roles(value: any[]) {
    this._roles = value;
  }

  //registro
  public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.usuariosService.validarUsuario(this.usuario, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }

    //Invocacion del servicio
    //validar la contraseña que coincida
    if(this.usuario.password == this.usuario.confirmar_password){

      //Vamos a consumir el servicio de registrar usuario
      //Si todo es correcto se registra/se llama al servicio
    this.usuariosService.registrarUsuario(this.usuario).subscribe(
      (response)=>{
        alert("Usuario registrado correctamente")
        console.log("Usuario registrado: ", response);
        this.router.navigate(["/"]);
      }, (error)=>{
        alert("No se pudo registrar usuario");
      }
      );

    }else{
      alert("Las contraseñas no coinciden");
      this.usuario.password="";
      this.usuario.confirmar_password="";
    }

    this.errors = this.usuariosService.validarUsuario(this.usuario, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }

  }

}

//Cambios desde AQUI :)
