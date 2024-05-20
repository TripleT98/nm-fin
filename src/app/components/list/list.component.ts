import { Component, OnDestroy } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { ToDoService } from '@shared/services/todo.service';
import { ToDo } from '@shared/models/todo.model';
import { MatModule } from '@shared/modules/mat.module';
import { Observable, pipe, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { TableType } from '@shared/models/table-type.model';
import { PipesModule } from '@shared/modules/pipes/pipes.module';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ CommonModule, MatModule, PipesModule ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnDestroy {

  private readonly destroy$ = new Subject<any>();

  protected todos$: Observable<ToDo[]> = this.todoS.observer$;
  protected favouriteTodos$: Observable<ToDo[]> = this.todos$.pipe(map(todos => todos.filter(todo => todo.isFavorite)));
  protected expiringTodos$: Observable<ToDo[]> = this.todoS.watchExpiringTodos$();
  protected exeptExpiringTodos$: Observable<ToDo[]> = this.todoS.watchTodosExeptExpiring$();

  protected displayedColumns: string[] = ['checkbox', 'title', 'createdAt', 'deadline', 'isFavorite', 'delete'];
  protected tableType: typeof TableType = TableType;

  constructor(
    private todoS: ToDoService,
    private activatedRoute: ActivatedRoute
  ){
    //this.todoS.observer$.pipe(takeUntil(this.destroy$)).subscribe(console.log);
    this.expiringTodos$.subscribe(console.log);
  }

  protected switchFavourStatus(todo: ToDo): void {
    const currStatus = todo.isFavorite;
    this.todoS.patсhToDo(todo.id, {...todo, _isFavorite: !currStatus} as unknown as ToDo);
  }

  protected deleteTodo(todo: ToDo): void {
    this.todoS.deleteToDo(todo.id);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}


