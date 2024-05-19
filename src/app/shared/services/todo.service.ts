import { Injectable } from "@angular/core";
import { StorageMap } from '@ngx-pwa/local-storage';
import { ToDo } from '@shared/models/todo.model';
import { Observable } from "rxjs";
import { filter, map, delay, debounceTime } from 'rxjs/operators'

////////
const testTodos = [
  new ToDo('Первый', new Date(new Date().getTime() + 8**6)),
  new ToDo('Второй', new Date(new Date().getTime() + 9**6)),
  new ToDo('Третий', new Date(new Date().getTime() + 10**6)),
  new ToDo('Четвертый', new Date(new Date().getTime() + 11**6)),
  new ToDo('Петяый', new Date(new Date().getTime() + 12**6)),
  new ToDo('Длинное названиееееееееееееееееееееееееееееееееееееееее', new Date()),
]
////////

@Injectable()
export class ToDoService {

  private readonly key: string = 'todos';
  //private _todos: ToDo[] = [];

  public readonly observer$: Observable<ToDo[]> = this.watchTodos$(2000);

  constructor(
    private storage: StorageMap
  ){
    // this.storage.watch(this.key).subscribe(todos => {
    //   if (!todos) {
    //     return;
    //   }
    //   this._todos = todos as ToDo[];
    // })
    // ///////
    // testTodos.forEach(todo => {
    //   setTimeout(()=>this.createTodo(todo.title, todo.deadline), Math.random() * 10000);
    // });
    // this.setTodos(testTodos)
    // ///////
  }

  public createTodo(title: string, date: Date){
    const newTodo = new ToDo(title, date);
    this.getTodos().subscribe(todos => {
      const newTodos = [...todos, newTodo];
    this.setTodos(newTodos);
    })
  }

  public getTodos(): Observable<ToDo[]>{
    return this.storage.get(this.key).pipe(map(todos => (todos || []) as ToDo[]));
  }

  public deleteToDo(id: number): void {
    this.getTodos().subscribe(todos => {
      const newTodos = todos.filter(todo => todo.id !== id);
      this.setTodos(newTodos);
    })
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

  private watchTodos$(delayTime: number = 0): Observable<ToDo[]>{
    return this.storage.watch(this.key).pipe(
      debounceTime(delayTime),
      map(todos => (todos || []) as ToDo[]),
      map(todos => {
        return todos.map(todo => {
          const id = todo.id;
          const title = todo['_title'];
          const deadline = todo['_deadline'];
          const isFavorite = todo['_isFavorite'];
          return new ToDo(title, deadline, isFavorite, id);
        })}
      )
    );
  }

}
