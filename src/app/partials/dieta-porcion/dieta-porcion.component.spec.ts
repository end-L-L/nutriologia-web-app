import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietaPorcionComponent } from './dieta-porcion.component';

describe('DietaPorcionComponent', () => {
  let component: DietaPorcionComponent;
  let fixture: ComponentFixture<DietaPorcionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DietaPorcionComponent]
    });
    fixture = TestBed.createComponent(DietaPorcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
