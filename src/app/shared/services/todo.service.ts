import { Injectable } from "@angular/core";
import { StorageMap } from '@ngx-pwa/local-storage';
import { ToDo } from '@shared/models/todo.model';
import { Observable } from "rxjs";
import { filter, map, delay } from 'rxjs/operators'

////////
const testTodos = [
  new ToDo('Первый', new Date()),
  new ToDo('Второй', new Date()),
  new ToDo('Третий', new Date()),
  new ToDo('Четвертый', new Date()),
  new ToDo('Петяый', new Date()),
  new ToDo('Длинное названиееееееееееееееееееееееееееееееееееееееее', new Date()),
]
////////

@Injectable()
export class ToDoService<T extends ToDo = ToDo> {

  private readonly key: string = 'todos';
  private _todos: T[] = [];

  public readonly observer$: Observable<T[]> = this.watchTodos$();

  constructor(
    private storage: StorageMap
  ){
    this.storage.watch(this.key).subscribe(todos => {
      if (!todos) {
        return;
      }
      console.log(todos);
      this._todos = todos as T[];
    })
    // ///////
    // testTodos.forEach(todo => {
    //   setTimeout(()=>this.createTodo(todo.title, todo.deadline), Math.random() * 10000);
    // });
    this.setTodos(testTodos as T[])
    // ///////
  }

  public createTodo(title: string, date: Date){
    const newTodo = new ToDo(title, date) as T;
    this.getTodos().subscribe(todos => {
      const newTodos = [...todos, newTodo];
    this.setTodos(newTodos);
    })
  }

  public getTodos(): Observable<T[]>{
    return this.storage.get(this.key).pipe(map(todos => (todos || []) as T[]));
  }

  // public deleteToDo(id: number): boolean {
  //   const todo =
  // }

  // public pathToDo(id: number, todo: Record<ke>){

  // }

  private setTodos(data: T[]): void{
    this.storage.set(this.key, data).subscribe();
  }

  private watchTodos$(delayTime: number = 0): Observable<T[]>{
    return this.storage.watch(this.key).pipe(delay(delayTime),map(todos => (todos || []) as T[]));
  }

}
