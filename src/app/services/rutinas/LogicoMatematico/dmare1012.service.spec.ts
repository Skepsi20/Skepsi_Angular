import { TestBed } from '@angular/core/testing';
import { DMARE1012Service } from './dmare1012.service';


describe('DMARE1012Service', () => {
  let service: DMARE1012Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DMARE1012Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
