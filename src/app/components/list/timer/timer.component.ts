import { Component, Input, AfterViewChecked, AfterContentChecked, ElementRef } from '@angular/core';
import { PipesModule } from '@shared/modules/pipes/pipes.module';
import { CommonModule, } from '@angular/common';
import { MatModule } from '@shared/modules/mat.module';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule, MatModule, PipesModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent {

  @Input() todoId!: number;

  constructor(
    private ref: ElementRef
  ){

  }

}
