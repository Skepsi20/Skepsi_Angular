import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Emaan1012Component } from './emaan1012.component';

describe('Emaan1012Component', () => {
  let component: Emaan1012Component;
  let fixture: ComponentFixture<Emaan1012Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Emaan1012Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Emaan1012Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
