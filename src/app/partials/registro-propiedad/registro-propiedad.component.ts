import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { FacadeService } from 'src/services/facade.service';
import { PropiedadService } from 'src/services/propiedad.service';
declare var $:any;

@Component({
  selector: 'app-registro-propiedad',
  templateUrl: './registro-propiedad.component.html',
  styleUrls: ['./registro-propiedad.component.scss']
})
export class RegistroPropiedadComponent {

  public propiedad:any= {};
  public token: string = "";
  public errors:any={};
  public editar:boolean = false;
  public idUser: Number = 0;

  public valoresCheckbox: any = [];
  public servicios_json: any[] = [];
  public selectedImages: string[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog,
    private propiedadService: PropiedadService,
    private facadeService: FacadeService,
  ){}

  public regresar(){
    this.location.back();
  }

  //para el select de capacidades
  private _capacidades: any[] = [
    { value: '1', viewValue: '1' },
    { value: '2', viewValue: '1-2' },
    { value: '2', viewValue: '2-3' },
    { value: '2', viewValue: '4 a mas' }

  ];
  public get capacidades(): any[] {
    return this._capacidades;
  }
  public set capacidades(value: any[]) {
    this._capacidades = value;
  }

  //para el select para sanitarios
  private _sanitarios: any[] = [
    { value: '1', viewValue: '1' },
    { value: '2', viewValue: '3' },
    { value: '2', viewValue: '4' },
    { value: '2', viewValue: 'Mas de 5' }

  ];
  public get sanitarios(): any[] {
    return this._sanitarios;
  }
  public set sanitarios(value: any[]) {
    this._sanitarios = value;
  }

  public servicios: any[] = [
    { value: '1', nombre: 'Agua potable' },
    { value: '2', nombre: 'Luz electrica' },
    { value: '3', nombre: 'Internet' },
    { value: '4', nombre: 'Mascotas' },
    { value: '5', nombre: 'Cocina' },
    { value: '6', nombre: 'Estacionamiento' },
    { value: '7', nombre: 'Lavadora' },
    { value: '8', nombre: 'Amueblado' },
    { value: '9', nombre: 'Seguridad' }
  ];

  //para el select para estados
  private _estados: any[] = [
    { value: '1', viewValue: 'Ocupado' },
    { value: '2', viewValue: 'Disponible' },

  ];
  public get estados(): any[] {
    return this._estados;
  }
  public set estados(value: any[]) {
    this._estados = value;
  }


  public checkboxChange(event: any) {

    if (event.checked) {
      this.propiedad.servicios_json.push(event.source.value);
    } else {
      console.log(event.source.value);
      this.propiedad.servicios_json.forEach((servicio, i) => {
        if (servicio == event.source.value) {
          this.propiedad.servicios_json.splice(i, 1);
        }
      });

    }
    console.log("Array servicios: ", this.propiedad);
  }

 /* onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const files = event.target.files;
      this.selectedImages = [];

      // Leer y previsualizar cada archivo
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedImages.push(e.target.result);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }
*/
  public revisarSeleccion(nombre: string){
    if(this.propiedad.servicios_json){
      var busqueda = this.propiedad.servicios_json.find((element)=>element==nombre);
      if(busqueda != undefined){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  public registrar() {
    // Validar
    this.errors = [];
    this.errors = this.propiedadService.validarPropiedad(this.propiedad, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }

    // Llamar al servicio para registrar la materia
    this.propiedadService.registrarPropiedad(this.propiedad).subscribe(
      (response) => {
        alert("Propiedad registrada correctamente");
        console.log("Propiedad registrada:", response);
        if(this.token != ""){
          this.router.navigate(["home"]);
         }else{
           this.router.navigate(["/"]);
         }
      }, (error)=>{
        alert("No se pudo registrar usuario");
      }
    )
    this.errors = this.propiedadService.validarPropiedad(this.propiedad, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
  }
}
