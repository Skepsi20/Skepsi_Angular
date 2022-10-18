import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DMARE1012Component } from './dmare1012.component';

import { dMA1012Component } from './emaco1012.component';

describe('Emaco1012Component', () => {
  let component: DMARE1012Component;
  let fixture: ComponentFixture<DMARE1012Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DMARE1012Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DMARE1012Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
