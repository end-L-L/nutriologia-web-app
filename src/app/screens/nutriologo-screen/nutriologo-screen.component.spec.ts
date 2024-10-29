import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutriologoScreenComponent } from './nutriologo-screen.component';

describe('NutriologoScreenComponent', () => {
  let component: NutriologoScreenComponent;
  let fixture: ComponentFixture<NutriologoScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NutriologoScreenComponent]
    });
    fixture = TestBed.createComponent(NutriologoScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
