import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignoutComponent } from './components/auth/signout/signout.component';

@NgModule({
  declarations: [InputFieldComponent, SigninComponent, SignoutComponent],
  exports: [InputFieldComponent, SigninComponent, SignoutComponent],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
})
export class SharedModule {}
