import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { Person } from '../../person/shared/person.model';
import { PersonService } from '../../person/shared/person.service';
import { ExpenseControlService } from '../shared/expense-control.service';
import { Chart } from 'angular-highcharts';
import { ExpenseControl } from '../shared/expense-control.model';
import { ExpenseSumDto } from '../shared/expense-sum-dto.model';

@Component({
  selector: 'app-expense-control-chart',
  templateUrl: './expense-control-chart.component.html',
  styleUrls: ['./expense-control-chart.component.scss'],
})
export class ExpenseControlChartComponent implements OnInit, OnDestroy {
  subscribeGeneral: Subscriber<any> = new Subscriber();
  persons: Person[] = [];
  expenseControlsSum: ExpenseSumDto[] = [];
  personSelected: Person = new Person();
  chart: any;

  constructor(
    protected expenseControlService: ExpenseControlService,
    protected personervice: PersonService
  ) {}

  async ngOnInit() {
    this.persons = await this.personervice.getAll().toPromise();
    if (this.persons?.length > 0) {
      this.personSelected = this.persons[0];
      this.fillChart();
    }
  }

  ngOnDestroy() {
    this.subscribeGeneral.unsubscribe();
  }

  async fillChart() {
    if (!this.personSelected) {
      return;
    }
    this.expenseControlsSum = await this.expenseControlService
      .getExpenseSumByPersonId(this.personSelected?.id)
      .toPromise();
    const filterExpenseControlsExpense = this.expenseControlsSum
      .filter((ecs) => ecs.expense === 'EXPENSE')
      .map((ecs) => ecs.value);
    const filterExpenseControlsRevenue = this.expenseControlsSum
      .filter((ecs) => ecs.expense === 'REVENUE')
      .map((ecs) => ecs.value);

    this.chart = new Chart({
      chart: {
        type: 'line',
      },
      title: {
        text: 'Expense Control Chart',
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          color: '#FF0000',
          type: 'column',
          name: 'Expense',
          data: [filterExpenseControlsExpense || 0],
        },
        {
          color: '#008000',
          type: 'column',
          name: 'Revenue',
          data: [filterExpenseControlsRevenue || 0],
        },
      ],
    });
  }
}
