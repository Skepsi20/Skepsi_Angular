import { TestBed } from '@angular/core/testing';

import { Dmaco1012Service } from './dmaco1012.service';

describe('Dmaco1012Service', () => {
  let service: Dmaco1012Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dmaco1012Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
