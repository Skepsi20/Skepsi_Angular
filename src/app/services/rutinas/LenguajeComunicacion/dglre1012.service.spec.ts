import { TestBed } from '@angular/core/testing';

import { DGLRE1012Service } from './dglre1012.service';

describe('DGLRE1012Service', () => {
  let service: DGLRE1012Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DGLRE1012Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
