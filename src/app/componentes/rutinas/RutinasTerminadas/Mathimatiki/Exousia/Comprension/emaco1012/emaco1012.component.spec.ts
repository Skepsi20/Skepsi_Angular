import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Emaco1012Component } from './emaco1012.component';

describe('Emaco1012Component', () => {
  let component: Emaco1012Component;
  let fixture: ComponentFixture<Emaco1012Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Emaco1012Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Emaco1012Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
