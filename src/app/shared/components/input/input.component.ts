import {
  Component,
  forwardRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputStatusDirective } from '../../../core/directives/input-status.directive';
import { JsonPipe } from '@angular/common';
import { Errors } from '../../../core/constanst/errors.enums';
import { delay } from 'rxjs';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [ReactiveFormsModule, InputStatusDirective, JsonPipe],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor, OnChanges {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() control: FormControl | any = new FormControl();
  @Input() hasAsyncValidator: boolean = false;

  firstError: string = '';
  Errors: any = Errors;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    //The delay is beacuse it is waited to the async validator to finish and avoid to send each word to the server, the delay is 2 seconds in custom validator, and here is 2.1 seconds
    if (this.hasAsyncValidator) {
      this.control.valueChanges.pipe(delay(2100)).subscribe((_val: any) => {
        this.setFirstError();
      });
    } else {
      this.control.valueChanges.subscribe((_val: any) => {
        this.setFirstError();
      });
    }
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    if (value !== undefined) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.setFirstError();
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  updateValue(val: string) {
    this.value = val;
    this.onChange(val);
    this.onTouched();
  }

  setFirstError(): void {
    this.firstError = Object.keys(this.control.errors || {})[0];
  }
}
