import { Component, Input, OnInit } from '@angular/core';
import { NutriologoService } from 'src/services/nutriologo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/services/facade.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditarUserModalComponent } from 'src/app/modals/editar-user-modal/editar-user-modal.component';

//Para poder usar jquery definir esto
declare var $:any;

@Component({
  selector: 'app-registro-nutriologo',
  templateUrl: './registro-nutriologo.component.html',
  styleUrls: ['./registro-nutriologo.component.scss']
})
export class RegistroNutriologoComponent implements OnInit{
  @Input() rol: string = "";
  @Input() datos_user: any = {};

 //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  public nutriologo:any= {};
  public token: string = "";
  public errors:any={};
  public editar:boolean = false;
  public idUser: Number = 0;

  constructor(
    private location : Location,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private nustriologoService: NutriologoService,
    private facadeService: FacadeService,
    public dialog: MatDialog

  ){}

  ngOnInit(): void {
    //El primer if valida si existe un parámetro en la URL
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idUser = this.activatedRoute.snapshot.params['id'];
      //console.log("ID User: ", this.idUser);
      //Al iniciar la vista asignamos los datos del user
      this.nutriologo = this.datos_user;
    }else{
      this.nutriologo = this.nustriologoService.esquemaNutriologo();
      this.nutriologo.rol = this.rol;
      this.token = this.facadeService.getSessionToken();
    }
    //Imprimir datos en consola
    //console.log("Nutriologo: ", this.nutriologo);

  }

  public regresar(){
    this.location.back();
  }

  public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.nustriologoService.validarNutriologo(this.nutriologo, this.editar)
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    // Validamos que las contraseñas coincidan
    //Validar la contraseña
    if(this.nutriologo.password == this.nutriologo.confirmar_password){

      let post_data = this.nustriologoService.createPost(this.nutriologo);

      this.nustriologoService.registrarNutriologo(post_data).subscribe({
        next: (response) => {
          alert('Usuario Registrado Correctamente');
          //console.log(response);
          this.router.navigate(['']);
        },
        error: (response) => {
          alert('¡Error!: No se Pudo Registrar Usuario \nResponse: ' + response.error.message);
          //console.log(response.error);
        },
      });
    }else{
      alert("Las contraseñas no coinciden");
      this.nutriologo.password="";
      this.nutriologo.confirmar_password="";
    }
  }
  public actualizar(){
    //Validación
    this.errors = [];

    this.errors = this.nustriologoService.validarNutriologo(this.nutriologo, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    console.log("Pasó la validación");

    const dialogRef = this.dialog.open(EditarUserModalComponent,{
      data: {rol: 'nutriologo'}, //Se pasan valores a través del componente
      height: '288px',
      width: '328px',
    });


    dialogRef.afterClosed().subscribe(result => {
      if(result.isEdit){
        this.nustriologoService.editarNutriologo(this.nutriologo).subscribe(
          (response)=>{
            alert("Nutriologo editado correctamente");
            console.log("Nutriologo editado: ", response);
            //Si se editó, entonces mandar al home
            this.router.navigate(["home"]);
          }, (error)=>{
            alert("No se pudo editar al nutriologo");
            console.log("Error: ", error);
          }
        );
      }else{
        console.log("No se editó al nutriologo");
      }
    });
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
}
