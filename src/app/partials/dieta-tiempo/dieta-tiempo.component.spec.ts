import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietaTiempoComponent } from './dieta-tiempo.component';

describe('DietaTiempoComponent', () => {
  let component: DietaTiempoComponent;
  let fixture: ComponentFixture<DietaTiempoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DietaTiempoComponent]
    });
    fixture = TestBed.createComponent(DietaTiempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
