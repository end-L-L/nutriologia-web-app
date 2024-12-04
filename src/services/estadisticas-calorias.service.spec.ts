import { TestBed } from '@angular/core/testing';

import { EstadisticasCaloriasService } from './estadisticas-calorias.service';

describe('EstadisticasCaloriasService', () => {
  let service: EstadisticasCaloriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadisticasCaloriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
