import { Component } from '@angular/core';
import { dailyFood } from 'src/app/patients/interfaces';
import { ButtonComponent } from '../../button';

@Component({
  selector: 'app-daily-table',
  templateUrl: './daily-table.component.html',
  styleUrls: ['./daily-table.component.scss'],
})
export class DailyTableComponent {
  public foodList: dailyFood[] = [
    {
      fecha: '28/10/2024',
      calorias: 100,
      objetivoCumplido: '❌',
      detalles: '',
      id: 1,
    },
  ];
}
