import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsRoutingModule } from './patients-routing.module';
import { MainComponent } from './pages/main/main.component';

import { ProgressBarComponent } from './components/ui/progress-bar';
import { ButtonComponent } from './components/ui/button';
import { InputComponent, InputContainerComponent, InputLabelComponent } from './components/ui/input';
import { SelectComponent } from './components/ui/select';
import { ConsumedTableComponent } from './components/ui/table/consumed-table/consumed-table.component';

@NgModule({
  declarations: [
    MainComponent,
    ProgressBarComponent,
    InputComponent,
    InputLabelComponent,
    InputContainerComponent,
    ButtonComponent,
    SelectComponent,
    ConsumedTableComponent,
  ],
  imports: [CommonModule, PatientsRoutingModule],
})
export class PatientsModule {}
