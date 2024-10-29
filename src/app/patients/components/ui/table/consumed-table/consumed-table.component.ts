import { Component, Input } from '@angular/core';
import { ConsumedFood } from 'src/app/patients/interfaces';

@Component({
  selector: 'app-consumed-table',
  templateUrl: './consumed-table.component.html',
  styleUrls: ['./consumed-table.component.scss'],
})
export class ConsumedTableComponent {
  @Input() foodList: ConsumedFood[] = [];
}
