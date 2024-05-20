import { Routes } from '@angular/router';
import { ListComponent } from '@components/list/list.component';
import { AddComponent } from '@components/add/add.component';
import { ListType } from '@shared/models/list-type.model';

export const routes: Routes = [
  { path: 'add', component: AddComponent },
  { path: 'list', component: ListComponent, data: { listType: ListType.all } },
  { path: 'favourite', component: ListComponent, data: { listType: ListType.favourite } },
  { path: '**', redirectTo: 'list' },
  { path: '', pathMatch: 'full', redirectTo: 'list' },
];
