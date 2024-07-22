import {
  Component,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputStatusDirective } from '../../../core/directives/input-status.directive';
import { JsonPipe } from '@angular/common';
import { Errors } from '../../../core/constanst/errors.enums';

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
export class InputComponent implements ControlValueAccessor, OnInit, OnChanges {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() control: FormControl | any = new FormControl();

  firstError: string = '';
  Errors: any = Errors;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);

    this.control.valueChanges.subscribe((_val: any) => {
      this.setFirstError();
    });
  }

  ngOnInit() {
    console.log(this.control);
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

  setFirstError() : void {
    this.firstError = Object.keys(this.control.errors || {})[0];
  }
}
