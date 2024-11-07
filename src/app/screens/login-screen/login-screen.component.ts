import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacadeService } from 'src/services/facade.service';
declare var $: any;

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss'],
})
export class LoginScreenComponent implements OnInit {
  public username: string = '';
  public password: string = '';
  public type: string = 'password';
  public errors: any = {};

  constructor(private router: Router, private facadeService: FacadeService) {}

  ngOnInit(): void {}

  public login() {
    this.errors = [];

    this.errors = this.facadeService.validarLogin(this.username, this.password);
    if (!$.isEmptyObject(this.errors)){
      return false;
    }

    this.facadeService.login(this.username, this.password).subscribe({
      next: (response) => {
        alert('Sesión Iniciada Correctamente');
        console.log(response);
        this.router.navigate(['/nutriologo-screen']);
      },
      error: (response) => {
        alert('¡Error!: No se Pudo Iniciar Sesión');
        console.log(response.error);
      },
    });
  }

  public registrar() {
    this.router.navigate(['registro-usuarios/nutriologo/']);
  }

  public showPassword() {
    if (this.type == 'password') {
      //Muestra la contraseña
      $('#show-password').addClass('show-password');
      $('#show-password').attr('data-password', true);
      this.type = 'text';
    } else if (this.type == 'text') {
      //Oculta la contraseña
      $('#show-password').removeClass('show-password');
      $('#show-password').attr('data-password', false);
      this.type = 'password';
    }
  }
}
