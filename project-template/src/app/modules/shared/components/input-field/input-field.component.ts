import { Component, Input, OnInit } from '@angular/core';
import {
  displayWarning,
  FormValidationStatus,
} from '../../helpers/form-validation.helper';
import { shareReplay, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
})
export class InputFieldComponent implements OnInit {
  displayWarning = displayWarning;

  FormValidationStatus = FormValidationStatus;

  @Input() disabled = false;
  @Input() readonly = false;
  @Input() parentForm: FormGroupTyped<any>;
  @Input() controlName: string;
  @Input() label: string;
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() mask: string;
  @Input() control: FormControl;

  isSubmitting$: Observable<boolean>;

  constructor() {}

  ngOnInit(): void {
    this.isSubmitting$ =
      this.parentForm?.controls.isSubmitting?.valueChanges.pipe(
        startWith(false),
        shareReplay()
      );
  }

  valueChanged() {
    this.parentForm.patchValue({ isSubmitting: false });
  }
}
