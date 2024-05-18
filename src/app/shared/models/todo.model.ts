export class ToDo {

  public readonly id: number;
  private _title: string;
  private _deadline: Date;
  private _isFavorite: boolean = false;

  constructor(
    title: string,
    deadline: Date
  ){
    // let i: keyof ToDo;
    // for (i in obj) {
    //   const val = obj[i];
    //   if (!obj.hasOwnProperty(i)) {
    //     continue;
    //   }
    //   this[i] = val;
    // }
    this._title = title;
    this._deadline = deadline;
    this.id = Math.random() * deadline.getTime();
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

  public getTimeLeft(): number {
    return this.deadline.getTime() - (new Date()).getTime();
  }

  public doesItEndToday(): boolean {
    const timeLeft = this.getTimeLeft();
    const msInDay = 24 * 60 * 60 * 1000;
    return timeLeft <= msInDay;
  }


}
