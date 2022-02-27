import { Injectable, Injector } from '@angular/core';
import { Person } from './person.model';

import { Observable } from 'rxjs';
import { UtilService } from 'src/app/shared/services/util.service';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import Gender from './gender.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PersonService extends BaseResourceService<Person> {
  constructor(protected injector: Injector) {
    super(`${UtilService.BASE_URL}/persons`, injector, Person.fromJson);
  }

  getGenders(): Observable<Gender[]> {
    const url = `${UtilService.BASE_URL}/enums/gender`;

    return this.http.get<Gender[]>(url);
  }

  downloadReportPdf(): Observable<any> {
    let headers = new HttpHeaders();

    headers = headers.set('Accept', 'application/pdf');

    return this.http.get(`${UtilService.BASE_URL}/persons-reports/pdf`, {
      headers: headers,
      responseType: 'blob',
    });
  }
}
