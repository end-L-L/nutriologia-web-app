import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyTableComponent } from './daily-table.component';

describe('DailyTableComponent', () => {
  let component: DailyTableComponent;
  let fixture: ComponentFixture<DailyTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyTableComponent]
    });
    fixture = TestBed.createComponent(DailyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
