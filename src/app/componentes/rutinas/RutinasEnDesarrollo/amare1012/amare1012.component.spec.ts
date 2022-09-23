import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AMARE1012Component } from './amare1012.component';

describe('AMARE1012Component', () => {
  let component: AMARE1012Component;
  let fixture: ComponentFixture<AMARE1012Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AMARE1012Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AMARE1012Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
