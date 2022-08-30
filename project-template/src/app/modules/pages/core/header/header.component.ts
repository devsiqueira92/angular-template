import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SigninCredentials } from 'src/app/modules/shared/entities/auth.interface';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { MatchPassword } from 'src/app/modules/shared/validators/match-password';
import { UniqueUsername } from 'src/app/modules/shared/validators/unique-username';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  signedin$: BehaviorSubject<boolean>;
  formGroup: FormGroupTyped<SigninCredentials>;
  // authForm = new FormGroup(
  //   {
  //     username: new FormControl('', [
  //       Validators.required,
  //       Validators.minLength(3),
  //       Validators.maxLength(20),
  //       Validators.pattern(/^[a-z0-9]+$/),
  //     ]),
  //     password: new FormControl('', [
  //       Validators.required,
  //       Validators.minLength(4),
  //       Validators.maxLength(20),
  //     ]),
  //   },
  //   { validators: [this.matchPassword.validate] }
  // );

  constructor(
    private matchPassword: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.signedin$ = this.authService.signedin$;
  }

  ngOnInit(): void {
    // this.formGroup = this.fb.group(
    //   HeaderComponent.buildFormGroup(false)
    // ) as FormGroupTyped<SigninCredentials>;
  }

  onSignOut() {
    this.authService.signout().subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }

  // onSignIn() {
  //   this.authService.signin(this.formGroup.value).subscribe({
  //     next: () => {},
  //     error: ({ error }) => {
  //       if (error.username || error.password) {
  //         this.formGroup.setErrors({ credentials: true });
  //       }
  //     },
  //   });
  // }

  // private static buildFormGroup(disabled: boolean): {
  //   [K in keyof Partial<SigninCredentials>]: any;
  // } {
  //   return {
  //     // isSubmitting: new FormControl(false),
  //     username: new FormControl('', [
  //       Validators.required,
  //       Validators.minLength(3),
  //       Validators.maxLength(20),
  //       Validators.pattern(/^[a-z0-9]+$/),
  //     ]),
  //     password: new FormControl('', [
  //       Validators.required,
  //       Validators.minLength(4),
  //       Validators.maxLength(20),
  //     ]),
  //   };
  // }
}
