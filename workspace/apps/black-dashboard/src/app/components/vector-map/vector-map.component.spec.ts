import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VectorMapComponent1 } from './vector-map.component';

describe('VectorMapComponent1', () => {
  let component: VectorMapComponent1;
  let fixture: ComponentFixture<VectorMapComponent1>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VectorMapComponent1],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VectorMapComponent1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
