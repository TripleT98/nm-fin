import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoService } from '@shared/services/todo.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  constructor(
    private todoS: ToDoService
  ){

  }

}
