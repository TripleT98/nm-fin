import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { ToDo } from '@shared/models/todo.model';
import { PipesModule } from '@shared/modules/pipes/pipes.module';
import { MatModule } from '@shared/modules/mat.module';
import { ListComponent } from './../list.component';
import { TimerComponent } from './../timer/timer.component';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [CommonModule, MatModule, PipesModule, TimerComponent],
  templateUrl: './list-item.component.html',
  styleUrls: ['./../general.scss', './list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent {

  @Input() todo!: ToDo;

  someDate = new Date()

  constructor(
    protected parentList: ListComponent
  ){

  }


}
