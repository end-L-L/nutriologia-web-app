import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteScreenComponent } from './estudiante-screen.component';

describe('EstudianteScreenComponent', () => {
  let component: EstudianteScreenComponent;
  let fixture: ComponentFixture<EstudianteScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstudianteScreenComponent]
    });
    fixture = TestBed.createComponent(EstudianteScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
