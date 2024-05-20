import { NgModule } from "@angular/core";
import { GetTimePipe } from './get-time-pipe';

const pipes: any[] = [
  GetTimePipe
]

@NgModule({
  imports: [],
  declarations: [...pipes],
  exports: [...pipes],
})
export class PipesModule{}
