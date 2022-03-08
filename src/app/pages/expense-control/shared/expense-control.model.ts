import { BaseResourceModel } from '../../../shared/models/base-resource.model';
import { Person } from '../../person/shared/person.model';
import Expense from './expense.model';

export class ExpenseControl extends BaseResourceModel {
  constructor(
    public id?: number,
    public description?: string,
    public dateExpense?: Date,
    public value?: number,
    public expense?: Expense,
    public person?: Person
  ) {
    super();
  }

  static fromJson(jsonData: any): ExpenseControl {
    return Object.assign(new ExpenseControl(), jsonData);
  }
}
