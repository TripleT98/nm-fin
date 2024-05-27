import { AdaptiveDirectiveViewModel } from '@shared/modules/directives/adaptive-model';
import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {BreakpointObserver} from "@angular/cdk/layout";

@Directive({
  selector: '[screenSizeStructure]'
})
export class ScreenSizeStructureDirective extends AdaptiveDirectiveViewModel implements OnInit, OnDestroy{

  @Input("screenSizeStructure") screen!: string[] | string;

  @Input("screenSizeStructureElse") desktopVersion: TemplateRef<any> | null = null;

  constructor(override _breakpointObserver: BreakpointObserver,
              private templateRef: TemplateRef<unknown>,
              private vcr: ViewContainerRef) {
    super(_breakpointObserver)

  }

  ngOnInit() {
    this.getCurentScreenSize();

    this.subscription = this.currentScreen$.subscribe(value => {
      if (Array.isArray(this.screen)) {
        this.changeDomFromArr(value, this.screen);
      } else {
        this.changeDOM(value, this.screen)
      }
    })
  }

  changeDomFromArr(screen: string, inputScreenArray: string[]) {
    const result = inputScreenArray.some(elem => elem === screen);
    this.vcr.clear();
    if (result) {
      this.vcr.createEmbeddedView(this.templateRef);
    } else {
      if (this.desktopVersion) {
        this.vcr.createEmbeddedView(this.desktopVersion);
      }
    }
  }

  changeDOM(screen: string, inputScreen: string) {
    if (screen === inputScreen) {
      // this.vcr.clear();
      this.vcr.createEmbeddedView(this.templateRef);
    } else {
      // this.vcr.clear();
      if (this.desktopVersion) {
        this.vcr.createEmbeddedView(this.desktopVersion);
      }
    }
  }

  ngOnDestroy() {
    this.onDestroy();
  }
}
