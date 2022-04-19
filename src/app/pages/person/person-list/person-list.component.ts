import { Component, OnInit } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Person } from '../shared/person.model';
import { PersonService } from '../shared/person.service';

import { DownloadService } from '../../../shared/services/download.service';

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
  name: string | undefined;
  email: string | undefined;

  constructor(
    private personService: PersonService,
    private downloadService: DownloadService
  ) {
    super(personService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  selectPerson(person: Person) {
    this.personSelected = person;
  }

  filter() {
    this.subscribeGeneral.add(
      this.personService
        .getAllFilter(this.pageNumber, this.size, this.name, this.email)
        .subscribe((response) => {
          this.page = response;
          this.resources = this.page.content;
          this.totalElementos = this.page.totalElements;
        })
    );
  }

  paginate(event: any) {
    //console.log(event);
    this.subscribeGeneral.add(
      this.personService
        .getAllFilter(event.page, event.rows, this.name, this.email)
        .subscribe((response) => {
          this.page = response;
          this.resources = this.page.content;
          this.totalElementos = this.page.totalElements;
        })
    );
  }

  downloadReportPdf() {
    this.downloadService
      .downloadReportPdf('person_report')
      .subscribe((response) => {
        this.downloadService.downloadFile(
          response,
          'person.pdf',
          'application/pdf'
        );
      });
  }
  downloadReportCsv() {
    this.downloadService.downloadReportCsv().subscribe((response) => {
      this.downloadService.downloadFile(response, 'person.csv', 'text/csv');
    });
  }
}
