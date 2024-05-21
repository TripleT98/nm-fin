import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RouteTrigger } from '@shared/models/route-trigget.models';
import { MatModule } from '@shared/modules/mat.module';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule, MatModule, RouterLink, RouterLinkActive ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  protected title: string = 'My TODO List';
  protected navItems: RouteTrigger[] = [
    {
      name: 'ADD',
      path: 'add',
      tooltip: 'Create new todo'
    },
    {
      name: 'LIST',
      path: 'list',
      tooltip: 'Open todo list'
    },
    {
      name: 'FAVORITE TODO LIST',
      path: 'favourite',
      tooltip: 'Show favorite todos'
    },
  ]

}
