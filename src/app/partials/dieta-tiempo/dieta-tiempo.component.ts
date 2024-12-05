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
  styleUrls: ['./dieta-tiempo.component.scss'],
})

export class DietaTiempoComponent implements OnInit {

  @Input() rol: string = "";
  @Input() datos_user: any = {};

  public tipo: string = "dieta-tiempo";
  public tipo_dia: string = "";
  public tiempo: any = {};
  public token: string = "";
  public errors: any = {};
  public editar: boolean = false;
  public idUser: Number = 0;
  public alimentos_json: any[] = [];
  public mesActual: number = new Date().getMonth() + 1;  // Guardamos el mes como número
  public dias: any[] = [];
  public diasConValores: { [key: string]: any } = {};
  public diasSeleccionados: string[] = [];
  public contadores: number[] = [0, 0, 0, 0];
  public anioActual: number = new Date().getFullYear();
  public diasSemana: string[] = ['LU', 'MA', 'MI', 'JU', 'VI', 'SÁ', 'DO'];

  public alimentos: any[] = [
    { value: '1', nombre: 'Carne' },
    { value: '2', nombre: 'Pollo' },
    { value: '3', nombre: 'Pescado' },
    { value: '4', nombre: 'Huevo' },
    { value: '5', nombre: 'Lentejas' },
    { value: '6', nombre: 'Manzana' },
    { value: '7', nombre: 'Brocoli' },
    { value: '8', nombre: 'Zanahoria' },
    { value: '9', nombre: 'Espinaca' },
    { value: '10', nombre: 'Naranja' },
    { value: '11', nombre: 'Arroz' },
    { value: '12', nombre: 'Maiz' },
    { value: '13', nombre: 'Anena' },
    { value: '14', nombre: 'Papa' },
    { value: '15', nombre: 'Tortilla' },
    { value: '16', nombre: 'Aguacate' },
    { value: '17', nombre: 'Nuez' },
    { value: '18', nombre: 'Semilla' },
    { value: '19', nombre: 'Aceite_oliva' },
    { value: '20', nombre: 'Mantequilla_mani' },
  ];

  public comidas: any[] = [
    { value: '1', nombre: 'Desayuno', alimentos: this.alimentos },
    { value: '2', nombre: 'Comida', alimentos: this.alimentos },
    { value: '3', nombre: 'Cena', alimentos: this.alimentos },
  ];

  constructor(
    private location: Location,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private tiempoService: TiempoService,
    private facadeService: FacadeService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['id'] != undefined) {
      this.editar = true;
      this.idUser = this.activatedRoute.snapshot.params['id'];
      this.tiempo = this.datos_user;
    } else {
      this.tiempo = this.tiempoService.esquemaTiempo();
      this.tiempo.rol = this.rol;
      this.token = this.facadeService.getSessionToken();
    }
    this.generarCalendario(new Date().getMonth() + 1, new Date().getFullYear());
  }

  public regresar() {
    this.location.back();
  }

  public registrar() {
    this.errors = this.tiempoService.validarTiempo(this.tiempo, this.editar);
    if (!$.isEmptyObject(this.errors)) {
      return false;
    }
    if (this.tiempo.password == this.tiempo.confirmar_password) {
      this.tiempoService.registrarTiempo(this.tiempo).subscribe(
        (response) => {
          alert("Usuario registrado correctamente");
          this.router.navigate(["home"]);
        }, (error) => {
          alert("No se pudo registrar usuario");
        }
      );
    } else {
      alert("Las contraseñas no coinciden");
      this.tiempo.password = "";
      this.tiempo.confirmar_password = "";
    }
  }

  public actualizar() {
    this.errors = this.tiempoService.validarTiempo(this.tiempo, this.editar);
    if (!$.isEmptyObject(this.errors)) {
      return false;
    }
    const dialogRef = this.dialog.open(EditarUserModalComponent, {
      data: { rol: 'nutriologo' },
      height: '288px',
      width: '328px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.isEdit) {
        this.tiempoService.editarTiempo(this.tiempo).subscribe(
          (response) => {
            alert("La dieta se editó correctamente");
            this.router.navigate(["nutriologo-screen"]);
          }, (error) => {
            alert("No se editó la dieta");
          }
        );
      }
    });
  }

  // Generar calendario con mes y año
  generarCalendario(mes: number, anio: number): void {
    this.mesActual = mes; // Guardamos solo el número del mes
    this.anioActual = anio; // Guardamos el año

    const diasEnMes = new Date(anio, mes, 0).getDate();
    const primerDia = new Date(anio, mes - 1, 1).getDay();
    this.dias = [];

    // Llenar los días vacíos al inicio del mes
    for (let i = 0; i < primerDia; i++) {
      this.dias.push({ dia: null });
    }

    // Llenar los días con el número del día
    for (let dia = 1; dia <= diasEnMes; dia++) {
      this.dias.push({ dia, fecha: `${dia}/${mes}/${anio}` });
    }
  }

  // Cambiar mes (incrementar o decrementar)
  cambiarMes(direccion: number): void {
    let nuevoMes = this.mesActual + direccion;
    let nuevoAnio = this.anioActual;

    if (nuevoMes === 0) {
      nuevoMes = 12;
      nuevoAnio--;
    } else if (nuevoMes === 13) {
      nuevoMes = 1;
      nuevoAnio++;
    }

    this.generarCalendario(nuevoMes, nuevoAnio);
  }

  // Obtener nombre del mes
  obtenerNombreMes(mes: number): string {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return meses[mes - 1]; // Ajuste para que empiece desde 0
  }

  // Función de selección de días
  toggleSeleccion(dia: any): void {
    if (!dia.fecha) return;

    const index = this.diasSeleccionados.indexOf(dia.fecha);

    if (index > -1) {
      this.diasSeleccionados.splice(index, 1);
    } else {
      this.diasSeleccionados.push(dia.fecha);
    }

    // Reiniciar el estado
    this.resetdia();
  }

  // Asignar valores a los días seleccionados
  asignarValores(): void {
    const valores = {
      proteinas: 2,
      frutas: 3,
      verduras: 4,
      carbohidratos: 2
    };

    // Asignar valores a los días seleccionados
    this.diasSeleccionados.forEach(dia => {
      this.diasConValores[dia] = { ...valores };
    });

    // Limpiar selección
    this.diasSeleccionados = [];
    alert("Valores guardados");
  }

  // Obtener clase CSS de los días
  obtenerClase(dia: any): string {
    if (!dia.fecha) return 'vacio';
    if (this.diasSeleccionados.includes(dia.fecha)) return 'seleccionado';
    if (this.diasConValores[dia.fecha]) return 'guardado';
    return '';
  }

  guardar(): void {
    // Guardar los valores actuales de los contadores
    const valores = [...this.contadores];

    // Asignar los valores a los días seleccionados
    this.diasSeleccionados.forEach(dia => {
      this.diasConValores[dia] = valores;
    });

    // Mostrar un mensaje de confirmación
    alert('Cambios guardados');

    // Reiniciar el estado
    this.resetCalendario();
  }

  resetCalendario(): void {
    // Limpiar días seleccionados
    this.diasSeleccionados = [];

    // Reiniciar los contadores a 0
    this.contadores = [0, 0, 0, 0];

    // Limpiar valores guardados de todos los días
    this.diasConValores = {};

    // Regenerar el calendario para el día siguiente
    this.generarCalendario(this.mesActual, this.anioActual);
  }

  resetdia(): void {
    // Reiniciar los contadores a 0
    this.contadores = [0, 0, 0, 0];
  }


  cancelar(): void {
    this.diasSeleccionados = [];
    alert('Operación cancelada');

    // Reiniciar el estado
    this.resetCalendario();
  }

  incrementar(index: number): void {
    this.contadores[index]++;
  }

  decrementar(index: number): void {
    if (this.contadores[index] > 0) this.contadores[index]--;
  }

}
