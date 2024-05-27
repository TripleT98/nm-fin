import { NgModule } from '@angular/core';
import { ScreenSizeStructureDirective } from './screen-size.directive';

const directives = [
  ScreenSizeStructureDirective
]

@NgModule({
  imports: [],
  declarations: [...directives],
  exports: [...directives]
})
export class DirectivesModule {}
