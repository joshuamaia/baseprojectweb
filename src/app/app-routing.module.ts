import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'persons',
    loadChildren: () =>
      import('./pages/person/person.module').then((m) => m.PersonModule),
  },
  {
    path: 'expense-control',
    loadChildren: () =>
      import('./pages/expense-control/expense-control.module').then(
        (m) => m.ExpenseControlModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
