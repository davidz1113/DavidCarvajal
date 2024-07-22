import { Component, inject } from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {
  formBuilder: FormBuilder = inject(FormBuilder);

  formData: FormGroup = new FormGroup({});

  constructor() {
    this.formData = this.formBuilder.group({
      form1: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.formData.markAsUntouched();
  }
}
