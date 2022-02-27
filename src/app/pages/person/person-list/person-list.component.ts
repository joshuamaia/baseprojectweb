import { Component, OnInit } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Person } from '../shared/person.model';
import { PersonService } from '../shared/person.service';
import { saveAs } from 'file-saver';

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
    super.ngOnInit();
  }

  selectPerson(person: Person) {
    this.personSelected = person;
  }

  downloadFile(data: any, filename: string) {
    const blob = new Blob([data], { type: 'application/pdf' });
    // const url = window.URL.createObjectURL(blob);
    // window.open(url);
    saveAs(blob, filename);
  }

  downloadReportPdf() {
    this.personService.downloadReportPdf().subscribe((response) => {
      this.downloadFile(response, 'person.pdf');
    });
  }
}
