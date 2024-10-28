import { MatDialog } from '@angular/material/dialog';
import type { Macros } from '../../interfaces';

import { Component } from '@angular/core';
import { ModalHistorialComponent } from '../../components/modal-historial/modal-historial.component';

@Component({
  selector: 'patients-main-page',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  public macronutrientes: Macros = {
    calorias: 0,
    caloriasMax: 2000,
    proteinas: 0,
    proteinasMax: 100,
    carbohidratos: 0,
    carbohidratosMax: 300,
    grasas: 0,
    grasasMax: 100,
  };

  constructor(private dialog: MatDialog) {
    const interval = setInterval(() => {
      // Create a new object reference
      this.macronutrientes = {
        ...this.macronutrientes,
        grasas: this.macronutrientes.grasas + this.getRandomValue(),
        calorias: this.macronutrientes.calorias + this.getRandomValue(100),
        proteinas: this.macronutrientes.proteinas + this.getRandomValue(),
        carbohidratos: this.macronutrientes.carbohidratos + this.getRandomValue(),
      };

      if (this.isSomeoneMaxed()) {
        clearInterval(interval);
      }
    }, 1000);
  }

  // ONLY FOR DEVELOPMENT PURPOSES
  private isSomeoneMaxed() {
    const { proteinas, carbohidratos, grasas, calorias, caloriasMax, proteinasMax, carbohidratosMax, grasasMax } = this.macronutrientes;
    return proteinas >= proteinasMax || carbohidratos >= carbohidratosMax || grasas >= grasasMax || calorias >= caloriasMax;
  }

  private getRandomValue(multiply = 10) {
    return Math.trunc(Math.random() * multiply);
  }

  //funcion para abrir el historial de calorias diario
  openHistorial(){
    this.dialog.open(ModalHistorialComponent,{
      width:'60%', height:'400px'})
  }


}
