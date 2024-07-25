import { NgControl } from '@angular/forms';

export class MockNgControl extends NgControl {
  control = null;
  viewToModelUpdate() {}
}
