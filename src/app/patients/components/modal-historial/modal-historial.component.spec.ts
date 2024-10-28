import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHistorialComponent } from './modal-historial.component';

describe('ModalHistorialComponent', () => {
  let component: ModalHistorialComponent;
  let fixture: ComponentFixture<ModalHistorialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalHistorialComponent]
    });
    fixture = TestBed.createComponent(ModalHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
