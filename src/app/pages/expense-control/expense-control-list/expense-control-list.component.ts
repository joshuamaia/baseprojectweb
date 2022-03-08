import { Component, OnInit } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { ExpenseControl } from '../shared/expense-control.model';
import { ExpenseControlService } from '../shared/expense-control.service';

@Component({
  selector: 'app-expense-control-list',
  templateUrl: './expense-control-list.component.html',
  styleUrls: ['./expense-control-list.component.scss'],
})
export class ExpenseControlListComponent
  extends BaseResourceListComponent<ExpenseControl>
  implements OnInit
{
  expenseControlSelected: ExpenseControl = {};

  constructor(private expenseControlService: ExpenseControlService) {
    super(expenseControlService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  selectExpenseControl(expenseControl: ExpenseControl) {
    this.expenseControlSelected = expenseControl;
  }
}
