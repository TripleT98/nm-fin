import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoService } from '@shared/services/todo.service';
import { ToDo } from '@shared/models/todo.model';
import { MatModule } from '@shared/modules/mat.module';
import { Observable, pipe, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ CommonModule, MatModule ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnDestroy {

  private readonly destroy$ = new Subject<any>();
  protected todos$: Observable<ToDo[]> = this.todoS.observer$;
  protected displayedColumns: string[] = ['title', 'createdAt', 'deadline', 'isFavorite', 'delete'];

  constructor(
    private todoS: ToDoService
  ){
    this.todoS.observer$.pipe(takeUntil(this.destroy$)).subscribe(console.log)
  }

  protected switchFavourStatus(todo: ToDo): void {
    const currStatus = todo.isFavorite;
    this.todoS.patсhToDo(todo.id, {...todo, _isFavorite: !currStatus} as any);
  }

  protected deleteTodo(todo: ToDo): void {
    this.todoS.deleteToDo(todo.id);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}


// function withDebounce(time: number, inverse: boolean = false): any {
//   return function decor(obj: ListComponent, name: keyof ListComponent){
//     const oldFunc: (...args: any[]) => any = obj[name].bind(obj);
//     const timerMap = new Map<number, any>()
//     const newFunc = function (arg: {id: number}){
//     console.log('sdasd')
//       const id = arg.id;
//       const isTimersExis = timerMap.get(id)
//       if (isTimersExis) {
//         clearTimeout(isTimersExis);
//         if (!inverse) {
//           const timer = setTimeout(() => {oldFunc(arg)}, time);
//           timerMap.set(id, timer);
//         }
//       } else {
//         const timer = setTimeout(() => {oldFunc(arg)}, time);
//         timerMap.set(id, timer);
//       }
//     }
//     obj[name] = newFunc.bind(obj) as any;
//     console.log(name, obj, obj[name]);
//     console.log(obj as any['__proto__']);
//   }
// }

