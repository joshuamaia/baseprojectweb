import { Component, OnInit } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Person } from '../shared/person.model';
import { PersonService } from '../shared/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
})
export class PersonListComponent
  extends BaseResourceListComponent<Person>
  implements OnInit
{
  personSelected: Person = {};

  constructor(private personService: PersonService) {
    super(personService);
  }

  ngOnInit(): void {
    this.personService.getAllPage(this.page, this.size).subscribe(
      (resources) => {
        this.resources = resources;
      },
      (error) => alert('Erro ao carregar a lista')
    );
  }

  selectPerson(person: Person) {
    this.personSelected = person;
  }
}
