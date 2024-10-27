import { Component, Input } from '@angular/core';

@Component({
  selector: 'total-calories',
  templateUrl: './total-calories.component.html',
  styleUrls: ['./total-calories.component.scss'],
})
export class TotalCaloriesComponent {
  @Input() calories: { value: number; max: number } = { value: 0, max: 2000 };
}
