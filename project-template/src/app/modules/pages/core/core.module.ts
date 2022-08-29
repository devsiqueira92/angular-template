import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MenuComponent],
  exports: [MenuComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class CoreModule {}
