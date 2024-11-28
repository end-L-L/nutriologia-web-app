import { TestBed } from '@angular/core/testing';

import { PorcionService } from './porcion.service';

describe('PorcionService', () => {
  let service: PorcionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PorcionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
