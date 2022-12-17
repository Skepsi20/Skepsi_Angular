import { TestBed } from '@angular/core/testing';

import { Amaco1012Service } from './amaco1012.service';

describe('Amaco1012Service', () => {
  let service: Amaco1012Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Amaco1012Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
