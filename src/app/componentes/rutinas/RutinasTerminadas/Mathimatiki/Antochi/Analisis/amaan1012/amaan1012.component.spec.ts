import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Amaan1012Component } from './amaan1012.component';

describe('Amaan1012Component', () => {
  let component: Amaan1012Component;
  let fixture: ComponentFixture<Amaan1012Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Amaan1012Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Amaan1012Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
