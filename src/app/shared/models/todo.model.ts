import { Observable, interval } from "rxjs";
import { map } from 'rxjs/operators';

export class ToDo {

  public readonly id: number;
  private _title: string;
  private _deadline: Date;
  private _isFavorite: boolean = false;
  private _isExpired: boolean = false;
  public readonly createdAt: Date;

  constructor(
    title: string,
    deadline: Date,
    isFavorite?: boolean,
    id?: number,
    createdAt?: Date
  ){
    this._title = title;
    this._deadline = deadline;
    this.id = id || Math.random() * deadline.getTime();
    this._isFavorite = isFavorite || false;
    this.createdAt = createdAt || new Date();
    this.getTimeLeft();
  }

  public set title(text: string) {
    this._title = text;
  }

  public get title(): string {
    return this._title;
  }

  public set deadline(time: Date) {
    this._deadline = time;
  }

  public get deadline(): Date {
    return this._deadline;
  }

  public set isFavorite(favorStatus: boolean) {
    this._isFavorite = favorStatus;
  }

  public get isFavorite(): boolean {
    return this._isFavorite;
  }

  public set isExpired(isExpired: boolean) {
    this._isExpired = isExpired;
  }

  public get isExpired(): boolean {
    return this._isExpired;
  }

  public getTimeLeft(): number {
    const timeLeft = this.deadline.getTime() - (new Date()).getTime();
    if (timeLeft <= 0) {
      this.isExpired = true;
    }
    return timeLeft;
  }

  public doesItEndToday(): boolean {
    const timeLeft = this.getTimeLeft();
    const msInDay = 24 * 60 * 60 * 1000;
    return timeLeft <= msInDay;
  }


}
