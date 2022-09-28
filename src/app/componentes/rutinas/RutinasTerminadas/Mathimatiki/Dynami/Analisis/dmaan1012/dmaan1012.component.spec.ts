import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dmaan1012Component } from './dmaan1012.component';

describe('Dmaan1012Component', () => {
  let component: Dmaan1012Component;
  let fixture: ComponentFixture<Dmaan1012Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dmaan1012Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Dmaan1012Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
