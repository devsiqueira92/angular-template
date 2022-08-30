import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SigninCredentials } from '../../../entities/auth.interface';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  signedin$: BehaviorSubject<boolean>;
  formGroup: FormGroupTyped<SigninCredentials>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.signedin$ = this.authService.signedin$;
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group(
      SigninComponent.buildFormGroup(false)
    ) as FormGroupTyped<SigninCredentials>;
  }

  onSignIn() {
    this.authService.signin(this.formGroup.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: ({ error }) => {
        if (error.username || error.password) {
          this.formGroup.setErrors({ credentials: true });
        }
      },
    });
  }

  private static buildFormGroup(disabled: boolean): {
    [K in keyof Partial<SigninCredentials>]: any;
  } {
    return {
      // isSubmitting: new FormControl(false),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-z0-9]+$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    };
  }
}
