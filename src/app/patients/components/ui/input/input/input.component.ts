import { Component, Input } from '@angular/core';

@Component({
  selector: 'input-component',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() type: 'text' | 'number' | 'email' | 'password' = 'text';
  @Input() value: string | number = '';
  @Input() id: string = '';
}
