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
  name: string | undefined;
  email: string | undefined;
  description: string | undefined;

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

  filter() {
    this.subscribeGeneral.add(
      this.expenseControlService
        .getAllFilter(
          this.pageNumber,
          this.size,
          this.name,
          this.email,
          this.description
        )
        .subscribe((response) => {
          this.page = response;
          this.resources = this.page.content;
          this.totalElementos = this.page.totalElements;
        })
    );
  }

  paginate(event: any) {
    //console.log(event);
    this.subscribeGeneral.add(
      this.expenseControlService
        .getAllFilter(
          event.page,
          event.rows,
          this.name,
          this.email,
          this.description
        )
        .subscribe((response) => {
          this.page = response;
          this.resources = this.page.content;
          this.totalElementos = this.page.totalElements;
        })
    );
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
