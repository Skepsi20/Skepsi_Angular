import { TestBed } from '@angular/core/testing';

import { Dmaan1012Service } from './dmaan1012.service';

describe('Dmaan1012Service', () => {
  let service: Dmaan1012Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dmaan1012Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
