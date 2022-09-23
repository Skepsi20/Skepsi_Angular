import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dmaco1012Component } from './dmaco1012.component';

describe('Dmaco1012Component', () => {
  let component: Dmaco1012Component;
  let fixture: ComponentFixture<Dmaco1012Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Dmaco1012Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Dmaco1012Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
