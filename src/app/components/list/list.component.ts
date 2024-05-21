import { Component, OnDestroy } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { ToDoService } from '@shared/services/todo.service';
import { ToDo } from '@shared/models/todo.model';
import { MatModule } from '@shared/modules/mat.module';
import { Observable, pipe, Subject } from 'rxjs';
import { takeUntil, map, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { TableType } from '@shared/models/table-type.model';
import { ListType } from '@shared/models/list-type.model';
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

  protected todos$: Observable<ToDo[]> = this.todoS.observer$.pipe(tap(todos => this.restoreFavourPending(todos)));
  protected favouriteTodos$: Observable<ToDo[]> = this.todos$.pipe(map(todos => todos.filter(todo => todo.isFavorite)));
  protected expiringTodos$: Observable<ToDo[]> = this.todoS.watchExpiringTodos$();
  protected exeptExpiringTodos$: Observable<ToDo[]> = this.todoS.watchTodosExeptExpiring$();

  protected readonly displayedColumns: string[] = ['checkbox', 'title', 'createdAt', 'deadline', 'isFavorite', 'delete'];
  protected readonly tableType: typeof TableType = TableType;
  protected readonly listType$: Observable<ListType> = this.activatedRoute.data.pipe(map((data) => data['listType'] || ListType.all));
  protected readonly listTypes: typeof ListType = ListType;

  protected favourPending = new Map<number, boolean>();

  constructor(
    private todoS: ToDoService,
    private activatedRoute: ActivatedRoute
  ){
    this.todos$.pipe(takeUntil(this.destroy$)).subscribe();
  }

  protected switchFavourStatus(todo: ToDo): void {
    let { isFavorite: currStatus, id } = todo;
    const favourStatus = this.favourPending.get(id);
    if (favourStatus === undefined) {
      this.favourPending.set(id, !currStatus);
    } else {
      this.favourPending.set(id, !favourStatus);
    }
    this.todoS.patсhToDo(id, {...todo, _isFavorite: (favourStatus !== undefined) ? !favourStatus : !currStatus} as unknown as ToDo);
  }

  protected deleteTodo(todo: ToDo): void {
    this.todoS.deleteToDo(todo.id);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private restoreFavourPending(todos: ToDo[]): void {
    this.favourPending.clear();
    todos.forEach(todo => {
      this.favourPending.set(todo.id, todo.isFavorite);
    });
  }

}


