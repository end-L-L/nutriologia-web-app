import { Component } from '@angular/core';
import { ConsumedFood } from 'src/app/patients/interfaces';

@Component({
  selector: 'app-consumed-table',
  templateUrl: './consumed-table.component.html',
  styleUrls: ['./consumed-table.component.scss'],
})
export class ConsumedTableComponent {
  public foodList: ConsumedFood[] = [
    {
      alimento: 'Arroz',
      cantidad: 100,
      calorias: 130,
      proteinas: 2,
      carbohidratos: 28,
      grasas: 0,
      id: 1,
    },
  ];
}
