import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseControlRoutingModule } from './expense-control-routing.module';
import { ExpenseControlListComponent } from './expense-control-list/expense-control-list.component';
import { ExpenseControlDetailComponent } from './expense-control-detail/expense-control-detail.component';
import { ExpenseControlFormComponent } from './expense-control-form/expense-control-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExpenseControlChartComponent } from './expense-control-chart/expense-control-chart.component';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [
    ExpenseControlListComponent,
    ExpenseControlDetailComponent,
    ExpenseControlFormComponent,
    ExpenseControlChartComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ChartModule,
    ExpenseControlRoutingModule,
  ],
})
export class ExpenseControlModule {}
