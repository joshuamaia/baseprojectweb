import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Person } from '../../person/shared/person.model';
import { PersonService } from '../../person/shared/person.service';
import { ExpenseControl } from '../shared/expense-control.model';
import { ExpenseControlService } from '../shared/expense-control.service';
import Expense from '../shared/expense.model';

@Component({
  selector: 'app-expense-control-form',
  templateUrl: './expense-control-form.component.html',
  styleUrls: ['./expense-control-form.component.scss'],
})
export class ExpenseControlFormComponent
  extends BaseResourceFormComponent<ExpenseControl>
  implements OnInit, OnDestroy
{
  expenses: Expense[] = [];
  persons: Person[] = [];

  constructor(
    protected expenseControlService: ExpenseControlService,
    protected personervice: PersonService,
    protected injector: Injector
  ) {
    super(
      injector,
      new ExpenseControl(),
      expenseControlService,
      ExpenseControl.fromJson
    );
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      value: [null, [Validators.required]],
      description: [null, [Validators.required]],
      dateExpense: [null, [Validators.required]],
      expense: [null, [Validators.required]],
      person: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.subscribeGeneral.add(
      this.expenseControlService.getExpenses().subscribe((response) => {
        this.expenses = response;
      })
    );
    this.subscribeGeneral.add(
      this.personervice.getAll().subscribe((response) => {
        this.persons = response;
      })
    );
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  protected creationPageTitle(): string {
    return 'Add new Expense Controle';
  }

  protected editionPageTitle(): string {
    const expenseControlDescription = this.resource.description || '';
    return 'Editing Expense Control: ' + expenseControlDescription;
  }
}
