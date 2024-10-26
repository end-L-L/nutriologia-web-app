import { Component } from '@angular/core';

@Component({
  selector: 'main-page',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  public macronutrientes = {
    calorias: 0,
    caloriasMax: 2000,
    proteinas: 0,
    proteinasMax: 100,
    carbohidratos: 0,
    carbohidratosMax: 100,
    grasas: 0,
    grasasMax: 100,
  };

  constructor() {
    const interval = setInterval(() => {
      this.macronutrientes.calorias += 10;
      if (this.macronutrientes.calorias >= this.macronutrientes.caloriasMax) {
        clearInterval(interval);
      }
    }, 1000);
  }
}
