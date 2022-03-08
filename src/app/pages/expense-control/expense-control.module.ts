import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseControlRoutingModule } from './expense-control-routing.module';
import { ExpenseControlListComponent } from './expense-control-list/expense-control-list.component';
import { ExpenseControlDetailComponent } from './expense-control-detail/expense-control-detail.component';
import { ExpenseControlFormComponent } from './expense-control-form/expense-control-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ExpenseControlListComponent,
    ExpenseControlDetailComponent,
    ExpenseControlFormComponent,
  ],
  imports: [CommonModule, SharedModule, ExpenseControlRoutingModule],
})
export class ExpenseControlModule {}
