import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Aglre1012Component } from './aglre1012.component';

describe('Aglre1012Component', () => {
  let component: Aglre1012Component;
  let fixture: ComponentFixture<Aglre1012Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Aglre1012Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Aglre1012Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
