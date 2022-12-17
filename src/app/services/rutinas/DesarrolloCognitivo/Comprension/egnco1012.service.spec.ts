import { TestBed } from '@angular/core/testing';

import { Egnco1012Service } from './egnco1012.service';

describe('Egnco1012Service', () => {
  let service: Egnco1012Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Egnco1012Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
