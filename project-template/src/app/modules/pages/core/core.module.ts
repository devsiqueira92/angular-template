import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [MenuComponent, HeaderComponent],
  exports: [MenuComponent, HeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule,
    SharedModule,
  ],
})
export class CoreModule {}
