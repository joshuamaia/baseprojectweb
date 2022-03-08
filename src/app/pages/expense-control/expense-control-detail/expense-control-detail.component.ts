import { Component, Input, OnInit } from '@angular/core';
import { ExpenseControl } from '../shared/expense-control.model';

@Component({
  selector: 'app-expense-control-detail',
  templateUrl: './expense-control-detail.component.html',
  styleUrls: ['./expense-control-detail.component.scss'],
})
export class ExpenseControlDetailComponent implements OnInit {
  @Input()
  expenseControlSelected: ExpenseControl = {};

  constructor() {}

  ngOnInit(): void {}
}
