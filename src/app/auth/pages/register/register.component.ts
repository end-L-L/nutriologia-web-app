import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;

  public user: any = {};

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    // Inicializar el formulario con valores predeterminados
    this.userForm = this.fb.group({
      username: [''],
      password: ['pass', Validators.required],
      first_name: ['first-name-8', Validators.required],
      last_name: ['last-name-8', Validators.required],
      email: ['angular-user-8@mail.com', [Validators.required, Validators.email]],
      role: ['nutriologo', Validators.required],
      cedula: ['1274550', Validators.required],
      telefono: ['22239545488', [Validators.required, Validators.pattern(/^\d+$/)]],
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.userForm.valid) {

      this.user = this.userForm.value;
      this.user.username = this.user.email;

      this.apiService.registrarUsuario(this.userForm.value).subscribe({
        next: (response) => {
          alert('Usuario Registrado Correctamente');
          console.log(response);
          this.router.navigate(['/auth/login']);
        },
        error: (response) => {
          alert('¡Error!: No se Pudo Registrar Usuario');
          console.log(response.error);
        },
      });

    } else {
      alert('Form Invalid');
    }
  }
}
