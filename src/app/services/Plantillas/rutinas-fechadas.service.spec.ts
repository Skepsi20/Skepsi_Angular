import { TestBed } from '@angular/core/testing';

import { RutinasFechadasService } from './rutinas-fechadas.service';

describe('RutinasFechadasService', () => {
  let service: RutinasFechadasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RutinasFechadasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
