import { TestBed } from '@angular/core/testing';

import { AMARE1012Service } from './amare1012.service';

describe('AMARE1012Service', () => {
  let service: AMARE1012Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AMARE1012Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
