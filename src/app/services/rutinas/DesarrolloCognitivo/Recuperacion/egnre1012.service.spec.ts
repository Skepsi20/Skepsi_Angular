import { TestBed } from '@angular/core/testing';

import { EGNRE1012Service } from './egnre1012.service';

describe('EGNRE2012Service', () => {
  let service: EGNRE1012Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EGNRE1012Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
