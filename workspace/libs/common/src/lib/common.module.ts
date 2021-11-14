import { DigitOnlyDirective } from './directives/digit-only.directive';
import { NgModule } from '@angular/core';
import { TrimValueAccessorDirective } from './directives/trim-value-accessor';
import { CommonModule as NgCommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { SentMessageTimePipe } from './pipes/sent-message-time.pipe';
import { RelativeDateHeaderPipe } from './pipes/relative-date-header.pipe';

const MODULES = [
  DigitOnlyDirective,
  TrimValueAccessorDirective,
  SentMessageTimePipe,
  ButtonComponent,
  RelativeDateHeaderPipe
];

@NgModule({
  imports: [NgCommonModule],
  declarations: [...MODULES],
  exports: [...MODULES],
})
export class CommonModule {}
