import { NgModule } from "@angular/core";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const matModules: any[] = [
  MatTooltipModule,
  FormsModule,
  ReactiveFormsModule,
  MatInputModule,
  MatTableModule,
  MatIconModule,
  MatCheckboxModule
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
