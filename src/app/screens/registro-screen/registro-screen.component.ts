import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministradoresService } from 'src/services/admin.service';
import { PacienteService } from 'src/services/paciente.service';
import { FacadeService } from 'src/services/facade.service';
import { NutriologoService } from 'src/services/nutriologo.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registro-screen',
  templateUrl: './registro-screen.component.html',
  styleUrls: ['./registro-screen.component.scss']
})
export class RegistroScreenComponent implements OnInit{

  public tipo:string = "registro-usuarios";
  //JSON para los usuarios (admin, maestros, alumnos)
  public user:any ={};

  public isUpdate:boolean = false;
  public errors:any = {};
  //Banderas para el tipo de usuario
  public isAdmin:boolean = false;
  public isNutriologo:boolean = false;
  public isPaciente:boolean = false;
  public editar: boolean = false;
  public tipo_user:string = "";
  //Info del usuario
  public idUser: Number = 0;
  public rol: string = "";

  constructor(
    private location : Location,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private facadeService: FacadeService,
    private administradoresService: AdministradoresService,
    private pacienteService: PacienteService,
    private nutriologoService: NutriologoService
  ){}

  ngOnInit(): void {

    if (this.activatedRoute.snapshot.params['rol'] === 'paciente') {
      this.isPaciente = true;
      this.tipo_user = "paciente";
    } else if (this.activatedRoute.snapshot.params['rol'] === 'nutriologo') {
      this.isNutriologo = true;
      this.tipo_user = "nutriologo";
    }

    //Obtener de la URL el rol para saber cual editar
    if(this.activatedRoute.snapshot.params['rol'] != undefined){
      this.rol = this.activatedRoute.snapshot.params['rol'];
      console.log("Rol detect: ", this.rol);
    }
    //El if valida si existe un parámetro en la URL
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idUser = this.activatedRoute.snapshot.params['id'];
      console.log("ID User: ", this.idUser);
      //Al iniciar la vista obtiene el usuario por su ID
      this.obtenerUserByID();
    }

  }

  //Función para obtener un solo usuario por su ID
  public obtenerUserByID(){
    if(this.rol == "administrador"){
      this.administradoresService.getAdminByID(this.idUser).subscribe(
        (response)=>{
          this.user = response;
          //Agregamos valores faltantes
          this.user.first_name = response.user.first_name;
          this.user.last_name = response.user.last_name;
          this.user.email = response.user.email;
          this.user.tipo_usuario = this.rol;
          this.isAdmin = true;
          //this.user.fecha_nacimiento = response.fecha_nacimiento.split("T")[0];
          console.log("Datos user: ", this.user);
        }, (error)=>{
          alert("No se pudieron obtener los datos del usuario para editar");
        }
      );
    }else if(this.rol == "nutriologo"){
      this.nutriologoService.getNutriologoByID(this.idUser).subscribe(
        (response)=>{
          this.user = response;
          //Agregamos valores faltantes
          this.user.first_name = response.user.first_name;
          this.user.last_name = response.user.last_name;
          this.user.email = response.user.email;
          this.user.tipo_usuario = this.rol;
          this.isNutriologo = true;
          console.log("Datos nutriologo: ", this.user);
        }, (error)=>{
          alert("No se pudieron obtener los datos del usuario para editar");
        }
      );
    }else if(this.rol == "paciente"){
      this.pacienteService.getPacienteByID(this.idUser).subscribe(
        (response)=>{
          this.user = response;
          //Agregamos valores faltantes
          //this.user.first_name = response.user.first_name;
          //this.user.last_name = response.user.last_name;
          //this.user.email = response.user.email;
          //this.user.tipo_usuario = this.rol;
          this.isPaciente = true;
          console.log("Datos paciente: ", this.user);
        }, (error)=>{
          alert("No se pudieron obtener los datos del usuario para editar");
        }
      );
  }
}

  public radioChange(event: MatRadioChange) {

    if(event.value == "administrador"){
      this.isAdmin = true;
      this.tipo_user = "administrador"
      this.isPaciente = false;
      this.isNutriologo = false;
    }else if (event.value == "nutriologo"){
      this.isAdmin = false;
      this.isNutriologo = true;
      this.tipo_user = "nutriologo"
      this.isPaciente = false;
    }else if (event.value == "paciente"){
      this.isAdmin = false;
      this.isNutriologo = false;
      this.isPaciente = true;
      this.tipo_user = "paciente"
    }
  }

}
