import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsRoutingModule } from './patients-routing.module';
import { MainComponent } from './pages/main/main.component';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, PatientsRoutingModule],
})
export class PatientsModule {}
