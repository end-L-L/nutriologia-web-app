import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCaloriesComponent } from './total-calories.component';

describe('TotalCaloriesComponent', () => {
  let component: TotalCaloriesComponent;
  let fixture: ComponentFixture<TotalCaloriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalCaloriesComponent]
    });
    fixture = TestBed.createComponent(TotalCaloriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
