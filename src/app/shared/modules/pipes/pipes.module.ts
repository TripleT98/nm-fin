import { NgModule } from "@angular/core";
import { GetTimePipe } from './get-time-pipe';
import { GetErrorMessagePipe } from './errors.pipe';
import { DatePipe } from '@angular/common';

const pipes: any[] = [
  GetTimePipe,
  GetErrorMessagePipe
]

@NgModule({
  imports: [],
  declarations: [...pipes],
  exports: [...pipes],
  providers: [DatePipe]
})
export class PipesModule{}
