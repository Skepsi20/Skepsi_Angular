import { TestBed } from '@angular/core/testing';

import { Agnco1012Service } from './agnco1012.service';

describe('Agnco1012Service', () => {
  let service: Agnco1012Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Agnco1012Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
