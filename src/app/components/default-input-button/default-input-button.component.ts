import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { Component, forwardRef, Input } from '@angular/core';

type InputTypes = 'text' | 'email' | 'password';

@Component({
  selector: 'app-default-input-button',
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DefaultInputButtonComponent),
      multi: true,
    },
  ],
  templateUrl: './default-input-button.component.html',
  styleUrl: './default-input-button.component.css',
})
export class DefaultInputButtonComponent implements ControlValueAccessor {
  @Input() type: InputTypes = 'text';
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() inputName: string = '';

  value: String = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
