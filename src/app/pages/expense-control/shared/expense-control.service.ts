import { Injectable, Injector } from '@angular/core';

import { Observable } from 'rxjs';
import { UtilService } from 'src/app/shared/services/util.service';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { HttpHeaders } from '@angular/common/http';
import { ExpenseControl } from './expense-control.model';
import Expense from './expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseControlService extends BaseResourceService<ExpenseControl> {
  constructor(protected injector: Injector) {
    super(
      `${UtilService.BASE_URL}/expense-controls`,
      injector,
      ExpenseControl.fromJson
    );
  }

  getExpenses(): Observable<Expense[]> {
    const url = `${UtilService.BASE_URL}/enums/expense`;

    return this.http.get<Expense[]>(url);
  }
}
