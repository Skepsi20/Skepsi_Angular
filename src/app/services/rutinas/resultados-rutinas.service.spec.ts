import { TestBed } from '@angular/core/testing';

import { ResultadosRutinasService } from './resultados-rutinas.service';

describe('ResultadosRutinasService', () => {
  let service: ResultadosRutinasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultadosRutinasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
