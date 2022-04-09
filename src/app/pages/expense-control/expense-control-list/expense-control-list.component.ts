import { Component, OnInit } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { ExpenseControl } from '../shared/expense-control.model';
import { ExpenseControlService } from '../shared/expense-control.service';

import { DownloadService } from 'src/app/shared/services/download.service';

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

  constructor(
    private expenseControlService: ExpenseControlService,
    private downloadService: DownloadService
  ) {
    super(expenseControlService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  selectExpenseControl(expenseControl: ExpenseControl) {
    this.expenseControlSelected = expenseControl;
  }

  downloadReportPdf() {
    this.downloadService
      .downloadReportPdf('expense_report')
      .subscribe((response) => {
        this.downloadService.downloadFile(
          response,
          'expense.pdf',
          'application/pdf'
        );
      });
  }
}
