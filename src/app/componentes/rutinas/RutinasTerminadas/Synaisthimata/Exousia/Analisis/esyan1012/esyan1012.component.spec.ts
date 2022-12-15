import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Esyan1012Component } from './esyan1012.component';

describe('Esyan1012Component', () => {
  let component: Esyan1012Component;
  let fixture: ComponentFixture<Esyan1012Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Esyan1012Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Esyan1012Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
