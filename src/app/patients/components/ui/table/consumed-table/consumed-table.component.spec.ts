import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumedTableComponent } from './consumed-table.component';

describe('ConsumedTableComponent', () => {
  let component: ConsumedTableComponent;
  let fixture: ComponentFixture<ConsumedTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumedTableComponent]
    });
    fixture = TestBed.createComponent(ConsumedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
