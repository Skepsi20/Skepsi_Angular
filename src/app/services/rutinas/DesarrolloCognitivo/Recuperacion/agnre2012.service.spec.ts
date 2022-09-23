import { TestBed } from '@angular/core/testing';

import { AGNRE2012Service } from './agnre2012.service';

describe('AGNRE2012Service', () => {
  let service: AGNRE2012Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AGNRE2012Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
