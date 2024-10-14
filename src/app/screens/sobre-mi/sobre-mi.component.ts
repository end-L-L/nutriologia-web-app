import { Component, OnInit } from '@angular/core'; // Asegúrate de tener el servicio para manejar las peticiones
import { UsuariosService } from 'src/services/usuarios.service'; // Servicio que usas para manejar las solicitudes del usuario

@Component({
  selector: 'app-sobre-mi',
  templateUrl: './sobre-mi.component.html',
  styleUrls: ['./sobre-mi.component.scss']
})
export class SobreMiComponent implements OnInit {
  usuario = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmar_password: '',
    telefono: '',
    rol: '',
  };

  editMode = {
    first_name: false,
    last_name: false,
    email: false,
    password: false,
    telefono: false,
  };

  showPassword = false;
  errores: any = {};

  constructor(private usuariosService: UsuariosService) { }

  // Precargar los datos del usuario cuando se cargue el componente
  ngOnInit() {
    // Reemplaza '1' con el ID del usuario correcto
    this.usuariosService.getUsuarioByID(1).subscribe(
      (data) => {
        console.log('Datos del usuario:', data); // Verifica si los datos están llegando correctamente
        console.log('Rol del usuario:', data.rol); // Verifica si el rol está llegando
        // Precargar los datos del usuario en el formulario
        this.usuario.id = data.id || '';
        this.usuario.first_name = data.user.first_name || ''; // Asegúrate de que los datos están asignados correctamente
        this.usuario.last_name = data.user.last_name || '';
        this.usuario.email = data.user.email || '';
        this.usuario.password = '';  // No quieres mostrar la contraseña real
        this.usuario.confirmar_password = '';  // No es seguro precargar la contraseña
        this.usuario.telefono = data.telefono || '';
        this.usuario.rol = data.rol || '';
      },
      (error) => {
        console.error('Error al cargar los datos del usuario:', error);
      }
    );
  }

  // Función para alternar el modo de edición de un campo
  toggleEdit(field: string) {
    this.editMode[field] = !this.editMode[field]; // Alterna el modo de edición

    // Si el campo está en modo de edición, habilitar el campo para que sea editable
    if (this.editMode[field]) {
      const inputField = document.getElementById(field) as HTMLInputElement;
      if (inputField) {
        inputField.readOnly = false;  // Hacer el campo editable
        inputField.focus(); // Mover el cursor al campo editado
      }
    }
  }

  // Función para mostrar/ocultar la contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Función para guardar los cambios del formulario
  saveChanges() {
    // Validar antes de enviar los datos
    if (!this.usuario.first_name || !this.usuario.last_name || !this.usuario.email || !this.usuario.telefono) {
      alert('Por favor, complete todos los campos requeridos');
      return;
    }

    const erroresValidacion = this.usuariosService.validarUsuario(this.usuario, true);
    if (Object.keys(erroresValidacion).length > 0) {
      this.errores = erroresValidacion;
      console.log('Errores de validación:', this.errores);
      return;
    }

    // Realizar la llamada HTTP para actualizar los datos del usuario
    this.usuariosService.editarUsuario(this.usuario).subscribe(
      response => {
        console.log('Datos actualizados con éxito', response);
        alert('Cambios guardados correctamente');
        this.resetEditMode();  // Salir del modo de edición tras guardar
      },
      error => {
        console.error('Error al guardar los datos', error);
        alert('Ocurrió un error al guardar los cambios.');
      }
    );
  }

  // Función para restablecer todos los campos a modo de solo lectura
  resetEditMode() {
    this.editMode = {
      first_name: false,
      last_name: false,
      email: false,
      password: false,
      telefono: false
    };
  }

  eliminarCuenta() {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.');
    if (confirmacion) {
      const idUsuario = this.usuario.id; // Obtener el ID del usuario
      console.log('ID del usuario a eliminar:', idUsuario); // Verifica el ID

      if (idUsuario) {
        // Convertir idUsuario a número
        const idNumero = Number(idUsuario); // O usar parseInt(idUsuario, 10);
        console.log('ID convertido a número:', idNumero);
        // Asegurarte de que la conversión es válida
        if (!isNaN(idNumero)) {
          this.usuariosService.eliminarUsuario(idNumero).subscribe(
            (response) => {
              alert('Cuenta eliminada con éxito');
              // Opcionalmente, redirigir o realizar otra acción aquí
            },
            (error) => {
              console.error('Error al eliminar la cuenta:', error); // Manejo de error
              alert('Ocurrió un error al intentar eliminar la cuenta.');
            }
          );
        } else {
          alert('El ID del usuario no es válido.');
        }
      } else {
        alert('No se pudo obtener el ID del usuario.');
      }
    }
  }


}
