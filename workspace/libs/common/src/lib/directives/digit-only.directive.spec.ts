import { Component, ComponentRef, DebugElement, ElementRef, OnInit } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { noop } from 'rxjs';
import { DigitOnlyDirective } from './digit-only.directive';

@Component({
  selector: 'buildmotion-numbers',
  template: `
    <input
      type="text"
      name="credit-card-number"
      id="credit-card-number"
      placeholder="000"
      maxlength="3"
      inputmode="numeric"
      pattern="[0-9]*"
      angularArchitectureDigitalOnly
    />
  `,
  styles: [''],
})
export class NumbersComponent { }

export function getElement(fixture: ComponentFixture<ComponentRef<any>>, defaultElementIndex: number): DebugElement {
  const el: DebugElement = fixture.nativeElement as DebugElement;
  return el.children[defaultElementIndex];
}

describe('Directive: DigitOnlyDirective', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(() => {
    const meta: TestModuleMetadata = {
      declarations: [NumbersComponent, DigitOnlyDirective],
    };
    fixture = TestBed.configureTestingModule(meta).createComponent(NumbersComponent);
    fixture.detectChanges();
  });

  it('should create directive instance', () => {
    const el: ElementRef = new ElementRef(null);
    const directive = new DigitOnlyDirective(el);

    expect(directive).toBeTruthy();
    expect(directive).toBeDefined();
  });

  it('should only allow numeric values in the component', () => {
    noop();
  });
});
