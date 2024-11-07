import { Component, Input, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { TiempoService } from 'src/services/tiempo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/services/facade.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditarUserModalComponent } from 'src/app/modals/editar-user-modal/editar-user-modal.component';
import * as $ from 'jquery';


@Component({
  selector: 'app-dieta-tiempo',
  templateUrl: './dieta-tiempo.component.html',
  styleUrls: ['./dieta-tiempo.component.scss']
})
export class DietaTiempoComponent implements OnInit{

  @Input() rol: string = "";
  @Input() datos_user: any = {};

  public tipo:string = "dieta-tiempo";
  public tipo_dia:string = "";
  public tiempo:any= {};
  public token: string = "";
  public errors:any={};
  public editar:boolean = false;
  public idUser: Number = 0;
  public alimentos_json: any [] = [];

  public alimentos:any[]= [
    {value: '1', nombre: 'Carne'},
    {value: '2', nombre: 'Pollo'},
    {value: '3', nombre: 'Pescado'},
    {value: '4', nombre: 'Huevo'},
    {value: '5', nombre: 'Lentejas'},
    {value: '6', nombre: 'Manzana'},
    {value: '7', nombre: 'Brocoli'},
    {value: '8', nombre: 'Zanahoria'},
    {value: '9', nombre: 'Espinaca'},
    {value: '10', nombre: 'Naranja'},
    {value: '11', nombre: 'Arroz'},
    {value: '12', nombre: 'Maiz'},
    {value: '13', nombre: 'Anena'},
    {value: '14', nombre: 'Papa'},
    {value: '15', nombre: 'Tortilla'},
    {value: '16', nombre: 'Aguacate'},
    {value: '17', nombre: 'Nuez'},
    {value: '18', nombre: 'Semilla'},
    {value: '19', nombre: 'Aceite_oliva'},
    {value: '20', nombre: 'Mantequilla_mani'},
  ];

  public comidas:any[]= [
    {value: '1', nombre: 'Desayuno', alimentos: this.alimentos},
    {value: '2', nombre: 'Comida', alimentos: this.alimentos},
    {value: '3', nombre: 'Cena', alimentos: this.alimentos},
  ];

  public dias:any[]= [
    {value: '1', nombre: 'Luneas', comidas: this.comidas},
    {value: '2', nombre: 'Martes', comidas: this.comidas},
    {value: '3', nombre: 'Miercoles', comidas: this.comidas},
    {value: '4', nombre: 'Jueves', comidas: this.comidas},
    {value: '5', nombre: 'Viernes', comidas: this.comidas},
    {value: '6', nombre: 'Sabado', comidas: this.comidas},
    {value: '7', nombre: 'Domingo', comidas: this.comidas},
  ];

  constructor(
    private location : Location,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private tiempoService: TiempoService,
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
      this.tiempo = this.datos_user;
    }else{
      this.tiempo = this.tiempoService.esquemaTiempo();
      this.tiempo.rol = this.rol;
      this.token = this.facadeService.getSessionToken();
    }
    //Imprimir datos en consola
    console.log("Tiempo: ", this.tiempo);

  }

  public regresar(){
    this.location.back();
  }

  public Registrar(){
    //Validar
    this.errors = [];

    this.errors = this.tiempoService.validarTiempo(this.tiempo, this.editar)
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    // Validamos que las contraseñas coincidan
    //Validar la contraseña
    if(this.tiempo.password == this.tiempo.confirmar_password){
      //Aquí si todo es correcto vamos a registrar - aquí se manda a consumir el servicio
      this.tiempoService.registrarTiempo(this.tiempo).subscribe(
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
      this.tiempo.password="";
      this.tiempo.confirmar_password="";
    }
  }

  public actualizar(){
    //Validación
    this.errors = [];

    this.errors = this.tiempoService.validarTiempo(this.tiempo, this.editar)
    if(!$.isEmptyObject(this.errors)){
      return false;
    }

    const dialogRef = this.dialog.open(EditarUserModalComponent,{
      data: {rol: 'nutriologo'}, //Se pasan valores a través del componente
      height: '288px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isEdit){
        this.tiempoService.editarTiempo(this.tiempo).subscribe(
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

  public radioChange(event: MatRadioChange) {

    if(event.value == "Lunes"){
      this.tipo_dia = "Lunes"
    }else if (event.value == "Martes"){
      this.tipo_dia = "Martes"
    }else if (event.value == "Miercoles"){
      this.tipo_dia = "Miercoles"
    }
  }
}


