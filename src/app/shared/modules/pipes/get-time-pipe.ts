import { Pipe, PipeTransform } from '@angular/core';
import { ToDoService } from '@shared/services/todo.service';
import { ToDo } from '@shared/models/todo.model';
import { Observable, timer } from 'rxjs';
import { map, mergeMap, filter, tap } from 'rxjs/operators';

@Pipe({
  name: 'getTime'
})
export class GetTimePipe implements PipeTransform {

  private readonly todos$: Observable<ToDo[]> = this.todoS.observer$;

  constructor(
    private todoS: ToDoService
  ){
  }

  transform(todoId: number): Observable<string> {
    return timer(0, 1000).pipe(
      mergeMap(_ => this.todos$),
      map(todos => todos.find(todo => todo.id === todoId)),
      filter(todo => !!todo),
      map(todo => todo ? this.getTimeStr(todo?.getTimeLeft()) : '')
    )
  }

  //Время в миллисекнудах
  getTimeStr(ms: number) {
    if (ms <= 0) {
      return 'Time is up!'
    }
    var hours = ms / (1000*60*60);
    var absoluteHours = Math.floor(hours);
    var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

    //Get remainder from hours and convert to minutes
    var minutes = (hours - absoluteHours) * 60;
    var absoluteMinutes = Math.floor(minutes);
    var m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;

    //Get remainder from minutes and convert to seconds
    var seconds = (minutes - absoluteMinutes) * 60;
    var absoluteSeconds = Math.floor(seconds);
    var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;

    const resultStr = h + ':' + m + ':' + s
    return resultStr;
  }

}
