import { Component } from '@angular/core';

@Component({
  selector: 'main-page',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  public value = 0;
  public max = 100;

  constructor() {
    const interval = setInterval(() => {
      this.value += 10;
      if (this.value >= this.max) {
        clearInterval(interval);
      }
    }, 500);
  }
}
