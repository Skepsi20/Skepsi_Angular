import { TestBed } from '@angular/core/testing';

import { Amaan1012Service } from './amaan1012.service';

describe('Amaan1012Service', () => {
  let service: Amaan1012Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Amaan1012Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
