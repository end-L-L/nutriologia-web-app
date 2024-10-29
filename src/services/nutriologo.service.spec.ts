import { TestBed } from '@angular/core/testing';

import { NutriologoService } from './nutriologo.service';

describe('NutriologoService', () => {
  let service: NutriologoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutriologoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
