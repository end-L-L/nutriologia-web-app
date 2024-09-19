import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropietarioScreenComponent } from './propietario-screen.component';

describe('PropietarioScreenComponent', () => {
  let component: PropietarioScreenComponent;
  let fixture: ComponentFixture<PropietarioScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropietarioScreenComponent]
    });
    fixture = TestBed.createComponent(PropietarioScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
