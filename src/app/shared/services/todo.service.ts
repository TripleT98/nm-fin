import { Injectable } from "@angular/core";
import { StorageMap } from '@ngx-pwa/local-storage';
import { ToDo } from '@shared/models/todo.model';
import { Observable, interval, BehaviorSubject } from "rxjs";
import { filter, map, delay, debounceTime, mergeMap, take, startWith, tap } from 'rxjs/operators'

////////
const minute = 60_000;
const hour = 3_600_000;
const day = 3_600_000 * 24;


const testTodos = [
  new ToDo('Нулевой', new Date(new Date().getTime() + minute / 2)),
  new ToDo('Первый', new Date(new Date().getTime() + hour)),
  new ToDo('Второй', new Date(new Date().getTime() + hour * 3)),
  new ToDo('Третий', new Date(new Date().getTime() + day)),
  new ToDo('Четвертый', new Date(new Date().getTime() + day * 2)),
  new ToDo('Петяый', new Date(new Date().getTime() + day * 10)),
  new ToDo('Длинное названиееееееееееееееееееееееееееееееееееееееее', new Date()),
  new ToDo('Первый', new Date(new Date().getTime() + hour)),
  new ToDo('Второй', new Date(new Date().getTime() + hour * 3)),
  new ToDo('Третий', new Date(new Date().getTime() + day)),
  new ToDo('Четвертый', new Date(new Date().getTime() + day * 2)),
  new ToDo('Петяый', new Date(new Date().getTime() + day * 10)),
  new ToDo('Длинное названиееееееееееееееееееееееееееееееееееееееее', new Date()),
  new ToDo('Первый', new Date(new Date().getTime() + hour)),
  new ToDo('Второй', new Date(new Date().getTime() + hour * 3)),
  new ToDo('Третий', new Date(new Date().getTime() + day)),
  new ToDo('Четвертый', new Date(new Date().getTime() + day * 2)),
  new ToDo('Петяый', new Date(new Date().getTime() + day * 10)),
  new ToDo('Длинное названиееееееееееееееееееееееееееееееееееееееее', new Date()),
]
////////

@Injectable()
export class ToDoService {

  private readonly key: string = 'todos';

  public readonly observer$: Observable<ToDo[]> = this.watchTodos$(2000);

  constructor(
    private storage: StorageMap
  ){
     this.setTodos(testTodos)
  }

  public createTodo(title: string, date: Date){
    const newTodo = new ToDo(title, date);
    this.getTodos().subscribe(todos => {
      const newTodos = [newTodo, ...todos];
    this.setTodos(newTodos);
    })
  }

  public getTodos(): Observable<ToDo[]>{
    return this.storage.get(this.key).pipe(map(todos => (todos || []) as ToDo[]));
  }

  public deleteToDo(id: number): Observable<ToDo[]> {
   return this.getTodos().pipe(map(todos => {
      const newTodos = todos.filter(todo => todo.id !== id);
      this.setTodos(newTodos);
      return newTodos;
    }), delay(300));
  }

  public markForCheck(id: number): Observable<ToDo[]> {
    return this.deleteToDo(id);
  }

  public patсhToDo(id: number, todo: Partial<ToDo>){
    this.getTodos().subscribe(todos => {
      const todoToPatch = todos.find(todo => todo.id === id);
      if (!todoToPatch) {
        return;
      }
      const index = todos.indexOf(todoToPatch);
      const newTodo = Object.assign({...todoToPatch}, todo) as ToDo;
      const newTodos = [...todos];
      newTodos[index] = newTodo;
      this.setTodos(newTodos);
    })
  }

  private setTodos(data: ToDo[]): void{
    this.storage.set(this.key, data).subscribe();
  }

  private watchTodos$(delayTime: number = 0): BehaviorSubject<ToDo[]>{
    const todosBSubj = new BehaviorSubject<ToDo[]>([]);
    this.getTodos().pipe(map(todos => this.transformTodos(todos))).subscribe(todos => todosBSubj.next(todos));
    this.storage.watch(this.key).pipe(
      debounceTime(delayTime),
      map(todos => (todos || []) as ToDo[]),
      map(todos => {
        return this.transformTodos(todos)}
      )
    ).subscribe(todos => {
      todosBSubj.next(todos);
    });
    return todosBSubj;
  }

  private transformTodos(todos: ToDo[]): ToDo[]{
    return todos.map(todo => {
      const id = todo.id;
      const title = todo['_title'];
      const deadline = todo['_deadline'];
      const isFavorite = todo['_isFavorite'];
      const createdAt = todo['createdAt'];
      return new ToDo(title, deadline, isFavorite, id, createdAt);
    })
  }

  public watchExpiringTodos$(): Observable<ToDo[]> {
    return this.observer$.pipe(map(todos => todos.filter(todo => todo.doesItEndToday())))
  }

  public watchTodosExeptExpiring$(): Observable<ToDo[]> {
    return this.observer$.pipe(map(todos => todos.filter(todo => !todo.doesItEndToday())))
  }

}
