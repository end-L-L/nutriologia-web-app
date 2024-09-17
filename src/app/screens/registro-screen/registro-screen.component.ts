import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';

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

constructor(
  private router: Router,
  private activatedRoute: ActivatedRoute,
  private location: Location,
  public dialog: MatDialog,
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
  public tipos: any[] = [
    {value: '1', viewValue: 'Propietario'},
    {value: '2', viewValue: 'Estudiante'}
  ]

}
