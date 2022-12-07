import { TestBed } from '@angular/core/testing';

import { AyudaVisualService } from './ayuda-visual.service';

describe('AyudaVisualService', () => {
  let service: AyudaVisualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AyudaVisualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
