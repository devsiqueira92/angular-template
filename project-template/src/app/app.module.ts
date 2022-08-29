import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/pages/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
