import { NgModule } from "@angular/core";
import { GetTimePipe } from './get-time-pipe';
import { GetErrorMessagePipe } from './errors.pipe';

const pipes: any[] = [
  GetTimePipe,
  GetErrorMessagePipe
]

@NgModule({
  imports: [],
  declarations: [...pipes],
  exports: [...pipes],
})
export class PipesModule{}
