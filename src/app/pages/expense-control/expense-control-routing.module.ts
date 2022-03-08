import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseControlChartComponent } from './expense-control-chart/expense-control-chart.component';
import { ExpenseControlFormComponent } from './expense-control-form/expense-control-form.component';
import { ExpenseControlListComponent } from './expense-control-list/expense-control-list.component';

const routes: Routes = [
  { path: '', component: ExpenseControlListComponent },
  { path: 'chart', component: ExpenseControlChartComponent },
  { path: 'new', component: ExpenseControlFormComponent },
  { path: ':id/edit', component: ExpenseControlFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpenseControlRoutingModule {}
