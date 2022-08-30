import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupCredentials } from 'src/app/modules/shared/entities/auth.interface';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { MatchPassword } from 'src/app/modules/shared/validators/match-password';
import { UniqueUsername } from 'src/app/modules/shared/validators/unique-username';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  formGroup: FormGroupTyped<SignupCredentials>;

  constructor(
    private matchPassword: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group(this.buildFormGroup(false), {
      validators: [this.matchPassword.validate],
    }) as FormGroupTyped<SignupCredentials>;
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }

    this.authService.signup(this.formGroup.value).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/');
        // Navigate to some other route
      },
      error: (err) => {
        if (!err.status) {
          this.formGroup.setErrors({ noConnection: true });
        } else {
          this.formGroup.setErrors({ unknownError: true });
        }
      },
    });
  }

  private buildFormGroup(disabled: boolean): {
    [K in keyof Partial<SignupCredentials>]: any;
  } {
    return {
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]+$/),
        ],
        [this.uniqueUsername.validate]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    };
  }
}
