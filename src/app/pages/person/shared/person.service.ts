import { Injectable, Injector } from '@angular/core';
import { Person } from './person.model';

import { Observable } from 'rxjs';
import { UtilService } from 'src/app/shared/services/util.service';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import Gender from './gender.model';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PersonService extends BaseResourceService<Person> {
  constructor(protected injector: Injector) {
    super(`${UtilService.BASE_URL}/persons`, injector, Person.fromJson);
  }

  getAllFilter(
    page: number,
    size: number,
    name?: string,
    email?: string
  ): Observable<any> {
    const url = `${this.apiPath}/filter`;
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('size', size.toString());
    if (name) {
      params = params.set('name', name);
    }
    if (email) {
      params = params.set('email', email);
    }
    return this.http.get<any>(url, {
      params: params,
    });
  }

  getGenders(): Observable<Gender[]> {
    const url = `${UtilService.BASE_URL}/enums/gender`;

    return this.http.get<Gender[]>(url);
  }
}
