import { Component, OnInit } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { ExpenseControl } from '../shared/expense-control.model';
import { ExpenseControlService } from '../shared/expense-control.service';
import { saveAs } from 'file-saver';
import { PersonService } from '../../person/shared/person.service';

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
    private personService: PersonService
  ) {
    super(expenseControlService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  selectExpenseControl(expenseControl: ExpenseControl) {
    this.expenseControlSelected = expenseControl;
  }

  downloadFile(data: any, filename: string, type: string) {
    const blob = new Blob([data], { type: type });
    // const url = window.URL.createObjectURL(blob);
    // window.open(url);
    saveAs(blob, filename);
  }

  downloadReportPdf() {
    this.personService
      .downloadReportPdf('expense_report')
      .subscribe((response) => {
        this.downloadFile(response, 'expense.pdf', 'application/pdf');
      });
  }
}
