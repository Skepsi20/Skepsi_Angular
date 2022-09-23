import { TestBed } from '@angular/core/testing';

import { SkepsiService } from './skepsi.service';

describe('SkepsiService', () => {
  let service: SkepsiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkepsiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
