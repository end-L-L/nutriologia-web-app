import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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
  public isLoading: boolean = false; // agregado por david para bandera login

  constructor(private router: Router, private facadeService: FacadeService, private readonly cookieService: CookieService) {}

  //agregado por david para bandera login
  public login() {
    this.errors = [];

    this.errors = this.facadeService.validarLogin(this.username, this.password);
    if (!$.isEmptyObject(this.errors)) {
      return false;
    }

    this.isLoading = true; // Activar la bandera de carga

    this.facadeService.login(this.username, this.password).subscribe({
      next: (response) => {
        alert('Sesión Iniciada Correctamente');

        const ONE_DAY = 60 * 60 * 24;
        this.cookieService.set('session', response.access, ONE_DAY, '/');

        this.router.navigate(['/nutriologo-screen']);
        this.isLoading = false; // Desactivar la bandera de carga
      },
      error: (response) => {
        alert('¡Error!: No se Pudo Iniciar Sesión');
        console.log(response.error);
        this.isLoading = false; // Desactivar la bandera de carga
      },
    });
  }

  ngOnInit(): void {}

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
