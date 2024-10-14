import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/services/facade.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  dropdownOpen = false;

  constructor(
    private router: Router,
    private facadeService: FacadeService,
    public activatedRoute: ActivatedRoute,
  ){}

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // Método para navegar a la pantalla de Ver Perfil (Sobre Mí)
  viewProfile() {
    this.router.navigate(['/sobre-mi']);
  }

  registropropiedad() {
    this.router.navigate(['/registro-propiedad']);
  }

  // Método para navegar a la pantalla de Editar Cuenta (Sobre Mí también, con opción de edición)
  editAccount() {
    this.router.navigate(['/sobre-mi'], { queryParams: { editMode: true } });
  }

  // Método de ejemplo para eliminar la cuenta
  deleteAccount() {
    // Lógica de eliminación de cuenta
    console.log('Cuenta eliminada');
  }

  goToHome(){
    this.router.navigate(["home"])
  }

  goToLogin(){
    this.router.navigate(['login']);
  }
}
