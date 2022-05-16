import { Injectable, Injector } from '@angular/core';

import { Observable } from 'rxjs';
import { UtilService } from 'src/app/shared/services/util.service';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { ExpenseControl } from './expense-control.model';
import Expense from './expense.model';
import { ExpenseSumDto } from './expense-sum-dto.model';

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

  getExpenseSumByTotal(): Observable<ExpenseSumDto[]> {
    const url = `${UtilService.BASE_URL}/expense-controls/expense-sum`;

    return this.http.get<ExpenseSumDto[]>(url);
  }

  getExpenseSumByPersonId(
    personID: number | undefined
  ): Observable<ExpenseSumDto[]> {
    const url = `${UtilService.BASE_URL}/expense-controls/expense-sum/${personID}`;

    return this.http.get<ExpenseSumDto[]>(url);
  }

  getAllFilter(
    page: number,
    size: number,
    name?: string,
    email?: string,
    description?: string
  ): Observable<any> {
    const url = `${this.apiPath}/filter`;
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('size', size.toString());
    if (name) {
      params = params.set('name', name);
    }
    if (email) {
      params = params.set('email', email);
    }
    if (description) {
      params = params.set('description', description);
    }
    return this.http.get<any>(url, {
      params: params,
    });
  }
}
