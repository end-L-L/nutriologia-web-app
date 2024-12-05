import { TestBed } from '@angular/core/testing';

import { EstadisticasPorcionService } from './estadisticas-porcion.service';

describe('EstadisticasPorcionService', () => {
  let service: EstadisticasPorcionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadisticasPorcionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
