import { Routes } from '@angular/router';
import { ListComponent } from '@components/list/list.component';
import { AddComponent } from '@components/add/add.component';

export const routes: Routes = [
  { path: 'add', component: AddComponent },
  { path: 'list', component: ListComponent },
  { path: '**', redirectTo: 'list' },
  { path: '', pathMatch: 'full', redirectTo: 'list' },
];
