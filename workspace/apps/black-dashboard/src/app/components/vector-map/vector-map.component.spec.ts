import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VectorMapComponent } from './vector-map.component';

describe('VectorMapComponent1', () => {
  let component: VectorMapComponent;
  let fixture: ComponentFixture<VectorMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VectorMapComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VectorMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
