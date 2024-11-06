import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Inicializar el formulario con valores predeterminados
    this.userForm = this.fb.group({
      password: ['pass', Validators.required],
      first_name: ['first-name-8', Validators.required],
      last_name: ['last-name-8', Validators.required],
      email: ['angular-user-8@mail.com', [Validators.required, Validators.email]],
      role: ['nutriologo', Validators.required],
      especialidad: ['Nutrición', Validators.required],
      cedula: ['1274550', Validators.required],
      telefono: ['22239545488', [Validators.required, Validators.pattern(/^\d+$/)]],
      direccion: ['direccion de consultorio', Validators.required],
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Form Submitted', this.userForm.value);
      // Agrega la lógica para enviar los datos
    } else {
      alert('Form Invalid');
    }
  }
}
