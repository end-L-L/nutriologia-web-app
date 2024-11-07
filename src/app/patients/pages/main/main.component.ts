import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import type { ConsumedFood, Macros } from '../../interfaces';

import { Component } from '@angular/core';
import { ModalHistorialComponent } from '../../components/modal-historial/modal-historial.component';

@Component({
  selector: 'patients-main-page',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  public alimentosDB = {
    manzana: { calorias: 95, proteinas: 0.5, carbohidratos: 25, grasas: 0.3, porcion: '1 unidad (182g)' },
    pollo: { calorias: 165, proteinas: 31, carbohidratos: 0, grasas: 3.6, porcion: '100g' },
    arroz: { calorias: 130, proteinas: 2.7, carbohidratos: 28, grasas: 0.3, porcion: '1 taza (158g)' },
  } as const;

  public consumedFoodList: ConsumedFood[] = [];

  form = new FormGroup({
    name: new FormControl(''),
    unit: new FormControl<'g' | 'u' | ''>(''),
    amount: new FormControl(0),
  });

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

  constructor(private dialog: MatDialog) {}

  openHistorial() {
    this.dialog.open(ModalHistorialComponent, {
      width: '60%',
      height: '400px',
    });
  }

  public onSubmit() {
    const { value } = this.form;
    const { amount, name, unit } = value;

    if (!name || !amount || !unit) {
      console.log(name, amount, unit);
      alert('Por favor, rellena todos los campos');
      return;
    }

    if (amount <= 0) {
      alert('Por favor, ingresa un valor mayor a cero');
      return;
    }

    const alimentoInfo = this.alimentosDB[name.toLowerCase()] as (typeof this.alimentosDB)[keyof typeof this.alimentosDB];
    let factor = 1;

    if (unit === 'g') {
      factor = amount / 100;
    } else if (unit === 'u') {
      const [, gramos] = alimentoInfo.porcion.match(/(\d+)g/) || [null, '100'];
      factor = amount * (parseFloat(gramos) / 100);
    }

    const nuevoRegistro: ConsumedFood = {
      id: Math.random(),
      alimento: name,
      cantidad: amount,
      unit: unit,
      calorias: Number((alimentoInfo.calorias * factor).toFixed(2)),
      proteinas: Number((alimentoInfo.proteinas * factor).toFixed(2)),
      carbohidratos: Number((alimentoInfo.carbohidratos * factor).toFixed(2)),
      grasas: Number((alimentoInfo.grasas * factor).toFixed(2)),
    };

    this.consumedFoodList = [...this.consumedFoodList, nuevoRegistro];
    const macros: Macros = {
      caloriasMax: this.macronutrientes.caloriasMax,
      proteinasMax: this.macronutrientes.proteinasMax,
      carbohidratosMax: this.macronutrientes.carbohidratosMax,
      grasasMax: this.macronutrientes.grasasMax,
      calorias: 0,
      proteinas: 0,
      carbohidratos: 0,
      grasas: 0,
    };

    this.consumedFoodList.forEach((food) => {
      macros.calorias += food.calorias;
      macros.proteinas += food.proteinas;
      macros.carbohidratos += food.carbohidratos;
      macros.grasas += food.grasas;
    });

    this.macronutrientes = macros;
    this.form.reset({
      name: null,
      amount: 0,
      unit: null,
    });
  }
}
