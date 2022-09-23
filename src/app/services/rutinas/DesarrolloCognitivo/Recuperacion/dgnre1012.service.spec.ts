import { TestBed } from '@angular/core/testing';

import { DGNRE1012Service } from './dgnre1012.service';

describe('DGNRE1012Service', () => {
  let service: DGNRE1012Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DGNRE1012Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
