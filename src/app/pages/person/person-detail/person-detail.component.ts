import { Component, Input, OnInit } from '@angular/core';
import { Person } from '../shared/person.model';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss'],
})
export class PersonDetailComponent implements OnInit {
  @Input()
  personSelected: Person = {};

  constructor() {}

  ngOnInit(): void {}
}
