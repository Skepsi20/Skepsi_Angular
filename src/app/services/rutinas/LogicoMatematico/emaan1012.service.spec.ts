import { TestBed } from '@angular/core/testing';

import { Emaan1012Service } from './emaan1012.service';

describe('Emaan1012Service', () => {
  let service: Emaan1012Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Emaan1012Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
