import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from './components/input-field/input-field.component';

@NgModule({
  declarations: [InputFieldComponent],
  exports: [InputFieldComponent],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
})
export class SharedModule {}
