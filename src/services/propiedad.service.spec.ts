import { TestBed } from '@angular/core/testing';

import { PropiedadService } from './propiedad.service';

describe('PropiedadService', () => {
  let service: PropiedadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropiedadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
