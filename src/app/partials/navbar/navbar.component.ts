import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/services/facade.service';
declare var $:any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  @Input() tipo:string = "";
  @Input() rol:string ="";

  public token : string = "";
  public editar:boolean = false;

  constructor(
    private router: Router,
    private facadeService: FacadeService,
    public activatedRoute: ActivatedRoute,
  ){}

  ngOnInit(): void {
    //this.rol = this.facadeService.getUserGroup();
    //console.log("Rol user: ", this.rol);
    //Validar que haya inicio de sesión
    //Obtengo el token del login
    //this.token = this.facadeService.getSessionToken();
    //El primer if valida si existe un parámetro en la URL
    // if(this.activatedRoute.snapshot.params['id'] != undefined){
    //   this.editar = true;
    // }
  }

  //Cerrar sesión
  public logout(){
    console.log ("Cerrando Sesión");
    this.router.navigate([""]);
  }

  public goRegistro(){
    this.router.navigate(["registro-usuarios"]);
  }
}
