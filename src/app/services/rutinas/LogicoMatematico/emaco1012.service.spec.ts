import { TestBed } from '@angular/core/testing';

import { Emaco1012Service } from './emaco1012.service';

describe('Emaco1012Service', () => {
  let service: Emaco1012Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Emaco1012Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
