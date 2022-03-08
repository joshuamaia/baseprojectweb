import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { Person } from '../../person/shared/person.model';
import { PersonService } from '../../person/shared/person.service';
import { ExpenseControlService } from '../shared/expense-control.service';
import { Chart } from 'angular-highcharts';
import { ExpenseControl } from '../shared/expense-control.model';

@Component({
  selector: 'app-expense-control-chart',
  templateUrl: './expense-control-chart.component.html',
  styleUrls: ['./expense-control-chart.component.scss'],
})
export class ExpenseControlChartComponent implements OnInit, OnDestroy {
  subscribeGeneral: Subscriber<any> = new Subscriber();
  persons: Person[] = [];
  expenseControls: ExpenseControl[] = [];
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
    }
    this.subscribeGeneral.add(
      this.expenseControlService.getAll().subscribe((response) => {
        this.expenseControls = response;
        this.fillChart();
      })
    );
  }

  ngOnDestroy() {
    this.subscribeGeneral.unsubscribe();
  }

  fillChart() {
    const filterExpenseControlsExpense = this.expenseControls
      .filter(
        (ec) =>
          ec.person?.id === this.personSelected.id &&
          ec.expense?.description === 'Expense'
      )
      .map((ec) => ec.value);
    const filterExpenseControlsRevenue = this.expenseControls
      .filter(
        (ec) =>
          ec.person?.id === this.personSelected.id &&
          ec.expense?.description === 'Revenue'
      )
      .map((ec) => ec.value);
    const expense = filterExpenseControlsExpense.reduce(
      (acc, ec) => (acc || 0) + (ec || 0),
      0
    );
    const revenue = filterExpenseControlsRevenue.reduce(
      (acc, ec) => (acc || 0) + (ec || 0),
      0
    );
    console.log(this.personSelected);
    console.log(filterExpenseControlsExpense);
    console.log(filterExpenseControlsRevenue);
    console.log(expense);
    console.log(revenue);
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
          data: [expense || 0],
        },
        {
          color: '#008000',
          type: 'column',
          name: 'Revenue',
          data: [revenue || 0],
        },
      ],
    });
  }
}
