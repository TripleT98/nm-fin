import { NgModule } from "@angular/core";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgModel, ReactiveFormsModule } from "@angular/forms";

const matModules: any[] = [
  MatTooltipModule,
  FormsModule,
  ReactiveFormsModule,
  MatInputModule
]

@NgModule({
  imports: [
    ...matModules
  ],
  exports: [
    ...matModules
  ]
})
export class MatModule {

}
