import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { RouteTrigger } from '@shared/models/route-trigget.models';
import { MatModule } from '@shared/modules/mat.module';
import { EAdaptiveSize } from '@shared/models/adaptive-size';
import { DirectivesModule } from '@shared/modules/directives/directives.module';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule, MatModule, RouterLink, RouterLinkActive, DirectivesModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  protected readonly adaptiveSizes: typeof EAdaptiveSize = EAdaptiveSize;

  protected sideNavStatus: boolean = false;

  protected title: string = 'My TODO List';
  protected navItems: RouteTrigger[] = [
    {
      name: 'ADD',
      path: 'add',
      tooltip: 'Create new todo',
      icon: 'create',
    },
    {
      name: 'LIST',
      path: 'list',
      tooltip: 'Open todo list',
      icon: 'list_alt',
    },
    {
      name: 'FAVORITE TODO LIST',
      path: 'favourite',
      tooltip: 'Show favorite todos',
      icon: 'favorite,'
    },
  ]

  constructor(
    private router: Router
  ){

  }

  protected toggleSidenav(){
    this.sideNavStatus = !this.sideNavStatus;
  }

  protected navigateTo(path: string){
    this.sideNavStatus = false;
    this.router.navigate([path]);
  }

}
