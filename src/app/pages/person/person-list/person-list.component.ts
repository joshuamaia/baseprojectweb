import { Component, OnInit } from '@angular/core';
import { Person } from '../shared/person.model';
import { PersonService } from '../shared/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})
export class PersonListComponent implements OnInit {
  personList: Person[] = [];
  personSelected: Person = {};

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.personService.getAll(0, 10).subscribe((response) => {
      this.personList = response;
    });
  }

  selectPerson(person: Person) {
    this.personSelected = person;
  }
}
