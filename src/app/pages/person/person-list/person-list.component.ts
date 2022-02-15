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
    this.personService
      .getAllPage(this.pageNumber, this.size, this.wordSearch)
      .subscribe(
        (response) => {
          this.page = response;
          this.resources = this.page.content;
          this.totalElementos = this.page.totalElements;
        },
        (error) => alert('Erro ao carregar a lista')
      );
  }

  paginate(event: any) {
    //console.log(event);
    this.personService
      .getAllPage(event.page, event.rows, this.wordSearch)
      .subscribe((response) => {
        this.page = response;
        this.resources = this.page.content;
        this.totalElementos = this.page.totalElements;
      });
  }

  search() {
    this.personService
      .getAllPage(this.pageNumber, this.size, this.wordSearch)
      .subscribe((response) => {
        this.page = response;
        this.resources = this.page.content;
        this.totalElementos = this.page.totalElements;
      });
  }

  selectPerson(person: Person) {
    this.personSelected = person;
  }
}
