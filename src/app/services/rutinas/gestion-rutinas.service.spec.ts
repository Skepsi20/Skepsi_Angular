import { TestBed } from '@angular/core/testing';

import { GestionRutinasService } from './gestion-rutinas.service';

describe('GestionRutinasService', () => {
  let service: GestionRutinasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionRutinasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
