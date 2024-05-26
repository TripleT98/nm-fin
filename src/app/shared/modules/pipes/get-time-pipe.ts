import { Pipe, PipeTransform } from '@angular/core';
import { ToDoService } from '@shared/services/todo.service';
import { ToDo } from '@shared/models/todo.model';
import { Observable, timer, of } from 'rxjs';
import { map, mergeMap, filter, tap, startWith } from 'rxjs/operators';

@Pipe({
  name: 'getTime'
})
export class GetTimePipe implements PipeTransform {

  private readonly todos$: Observable<ToDo[]> = this.todoS.observer$;

  constructor(
    private todoS: ToDoService
  ){
  }

  transform(todoId: number): Observable<TimeInfo> {
    return of('').pipe(mergeMap(_ => timer(0, 1000).pipe(startWith(''),
      mergeMap(_ => this.todos$),
      map(todos => todos.find(todo => todo.id === todoId)),
      filter(todo => !!todo),
      map(todo => this.getTimeStr(todo?.getTimeLeft() || 0))
    )))
  }

  //Время в миллисекнудах
  getTimeStr(ms: number): TimeInfo {
    const isExpires = ms < 3_600_000;
    if (ms <= 0) {
      return {
        timeString: 'Time is up!',
        msTime: ms,
        isExpires
      };
    }
    var hours = ms / (1000*60*60);
    var absoluteHours = Math.floor(hours);
    var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

    var minutes = (hours - absoluteHours) * 60;
    var absoluteMinutes = Math.floor(minutes);
    var m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;

    var seconds = (minutes - absoluteMinutes) * 60;
    var absoluteSeconds = Math.floor(seconds);
    var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;

    const resultStr = h + ':' + m + ':' + s;
    return {
      timeString: resultStr,
      msTime: ms,
      isExpires
    };
  }

}

type TimeInfo = {
  timeString: string;
  msTime: number;
  isExpires: boolean;
}
