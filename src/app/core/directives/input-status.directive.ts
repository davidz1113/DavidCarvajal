import { Directive, HostBinding } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[uiInputStatus]',
  standalone: true,
})
export class InputStatusDirective {
  constructor(private control: NgControl) {}

  @HostBinding('class.is-inValid')
  public get isInValid(): boolean | null {
    return !this.control.valid && (this.control.touched);;
  }

}
