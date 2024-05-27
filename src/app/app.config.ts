import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToDoService } from '@shared/services/todo.service';
import { ValidationService } from '@shared/services/validation.service';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    ToDoService,
    ValidationService,
    DatePipe,
    BrowserModule,
    BrowserAnimationsModule,
    provideAnimations()
  ]
};
