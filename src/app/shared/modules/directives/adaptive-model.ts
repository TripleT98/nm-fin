import {Injectable} from "@angular/core";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {BehaviorSubject, Observable, Subject, Subscription, takeUntil} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AdaptiveDirectiveViewModel {

  constructor(public _breakpointObserver: BreakpointObserver) { }

  protected destroyed = new Subject<void>();
  protected currentScreenSize: BehaviorSubject<string> = new BehaviorSubject<string>('initial value');
  protected currentScreen$: Observable<string> = this.currentScreenSize.asObservable();

  protected subscription: Subscription | null = null;

  protected displayNameMap = new Map([
    [Breakpoints.XLarge, 'XLarge'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.XSmall, 'XSmall'],
  ])

  getCurentScreenSize() {
    this._breakpointObserver.observe([
      Breakpoints.XLarge,
      Breakpoints.Large,
      Breakpoints.Medium,
      Breakpoints.Small,
      Breakpoints.XSmall,
    ])
      .pipe(
        takeUntil(this.destroyed),
        // distinctUntilChanged()
      )
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize.next(this.displayNameMap.get(query) ?? 'Unknown')
          }
        }
      })
  }

  onDestroy() {
    this.destroyed.next();
    this.destroyed.complete();

    if (this.subscription !== null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
