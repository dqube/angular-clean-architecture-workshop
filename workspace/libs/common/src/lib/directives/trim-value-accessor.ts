/* eslint-disable @angular-eslint/directive-selector */
import { Directive, HostListener, forwardRef, Inject, Renderer2, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { noop } from 'rxjs';

const TRIM_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TrimValueAccessorDirective),
  multi: true,
};

/**
 * The trim accessor for writing trimmed value and listening to changes that is
 * used by the {@link NgModel}, {@link FormControlDirective}, and
 * {@link FormControlName} directives.
 */
@Directive({
  // tslint:disable-next-line: directive-selector
  selector: `
    input:not([type=checkbox]):not([type=radio]):not([type=password]):not([readonly]):not(.ng-trim-ignore)[formControlName],
    input:not([type=checkbox]):not([type=radio]):not([type=password]):not([readonly]):not(.ng-trim-ignore)[formControl],
    input:not([type=checkbox]):not([type=radio]):not([type=password]):not([readonly]):not(.ng-trim-ignore)[ngModel],
    textarea:not([readonly]):not(.ng-trim-ignore)[formControlName],
    textarea:not([readonly]):not(.ng-trim-ignore)[formControl],
    textarea:not([readonly]):not(.ng-trim-ignore)[ngModel],
    :not([readonly]):not(.ng-trim-ignore)[ngDefaultControl]
  `,
  providers: [TRIM_VALUE_ACCESSOR],
})
// tslint:disable-next-line: directive-class-suffix
export class TrimValueAccessorDirective implements ControlValueAccessor {
  // Source services to modify elements.
  private _sourceRenderer: Renderer2;
  private _sourceElementRef: ElementRef;
  private _value!: string;

  @HostListener('input', ['$event.target.value'])
  ngOnChange = (val: string) => {
    this.onChange(val != null ? val.trim() : val);
  };

  @HostListener('blur', ['$event.target.value'])
  ngOnBlur = (val: string) => {
    this.writeValue(val != null ? val.trim() : val);
    this.onTouched();
  };

  constructor(@Inject(Renderer2) renderer: Renderer2, @Inject(ElementRef) elementRef: ElementRef) {
    this._sourceRenderer = renderer;
    this._sourceElementRef = elementRef;
  }

  writeValue(value: any): void {
    if (typeof value === 'string') {
      this._value = value != null ? value.trim() : value;
      this._sourceRenderer.setProperty(this._sourceElementRef.nativeElement, 'value', this._value);
    }
  }

  onChange = (_: any) => {
    noop();
  };

  onTouched = () => {
    noop();
  };

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._sourceRenderer.setProperty(this._sourceElementRef.nativeElement, 'disabled', isDisabled);
  }
}
