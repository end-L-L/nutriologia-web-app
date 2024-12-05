import { TestBed } from '@angular/core/testing';

import { EstadisticasPesoMensualService } from './estadisticas-peso-mensual.service';

describe('EstadisticasPesoMensualService', () => {
  let service: EstadisticasPesoMensualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadisticasPesoMensualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
