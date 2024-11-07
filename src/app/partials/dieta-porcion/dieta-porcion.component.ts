import { Component, Input, OnInit } from '@angular/core';
import { PorcionService } from 'src/services/porcion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/services/facade.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditarUserModalComponent } from 'src/app/modals/editar-user-modal/editar-user-modal.component';

//Para poder usar jquery definir esto
declare var $:any;

@Component({
  selector: 'app-dieta-porcion',
  templateUrl: './dieta-porcion.component.html',
  styleUrls: ['./dieta-porcion.component.scss']
})
export class DietaPorcionComponent implements OnInit{
  @Input() rol: string = "";
  @Input() datos_user: any = {};

  public porcion:any= {};
  public token: string = "";
  public errors:any={};
  public editar:boolean = false;
  public idUser: Number = 0;

  constructor(
    private location : Location,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private porcionService: PorcionService,
    private facadeService: FacadeService,
    public dialog: MatDialog


  ){}

  ngOnInit(): void {
    //El primer if valida si existe un parámetro en la URL
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idUser = this.activatedRoute.snapshot.params['id'];
      console.log("ID User: ", this.idUser);
      //Al iniciar la vista asignamos los datos del user
      this.porcion = this.datos_user;
    }else{
      this.porcion = this.porcionService.esquemaPorcion();
      this.porcion.rol = this.rol;
      this.token = this.facadeService.getSessionToken();
    }
    //Imprimir datos en consola
    console.log("Porcion: ", this.porcion);

  }

  public regresar(){
    this.location.back();
  }

  public Registrar(){
    //Validar
    this.errors = [];

    this.errors = this.porcionService.validarPorcion(this.porcion, this.editar)
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    // Validamos que las contraseñas coincidan
    //Validar la contraseña
    if(this.porcion.password == this.porcion.confirmar_password){
      //Aquí si todo es correcto vamos a registrar - aquí se manda a consumir el servicio
      this.porcionService.registrarPorcion(this.porcion).subscribe(
        (response)=>{
          alert("Usuario registrado correctamente");
          console.log("Usuario registrado: ", response);
          this.router.navigate(["home"]);
        }, (error)=>{
          alert("No se pudo registrar usuario");
        }
      );
    }else{
      alert("Las contraseñas no coinciden");
      this.porcion.password="";
      this.porcion.confirmar_password="";
    }
  }

  public actualizar(){
    //Validación
    this.errors = [];

    this.errors = this.porcionService.validarPorcion(this.porcion, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    console.log("Validación correcta");

    const dialogRef = this.dialog.open(EditarUserModalComponent,{
      data: {rol: 'nutriologo'}, //Se pasan valores a través del componente
      height: '288px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isEdit){
        this.porcionService.editarPorcion(this.porcion).subscribe(
          (response)=>{
            alert("La dieta se edito correctamente");
            console.log("Dieta modificada: ", response);
            //Si se editó, entonces mandar al home
            this.router.navigate(["nutriologo-screen"]);
          }, (error)=>{
            alert("No se edito la");
            console.log("Error: ", error);
          }
        );
      }else{
        console.log("No se editó al nutriologo");
      }
    });



  }
}
