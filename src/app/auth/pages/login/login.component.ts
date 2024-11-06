import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void { }

  constructor(
    private router: Router,
    private apiService: ApiService
  ) { }

  public username: string = '';
  public password: string = '';
  public type: string = 'password';
  public errors: any = {};


  userToken = {
    'username': '',
    'password': ''
  }

  // función para iniciar sesión
  login() {
    console.log(this.userToken);
    console.log(this.username);
    console.log(this.password);

    this.userToken.username = this.username;
    this.userToken.password = this.password


    console.log(this.userToken);
    this.apiService.iniciarSesion(this.userToken).subscribe({
      next: (response) => {
        alert("Sesión Iniciada Correctamente");
        console.log(response);
        this.router.navigate(["/nutriologo-screen"]);
      },
      error: (response) => {
        alert("¡Error!: No se Pudo Iniciar Sesión");
        console.log(response.error);
      }
    });
  }

  public registrar() {
    this.router.navigate(['auth/register']);
  }
}
