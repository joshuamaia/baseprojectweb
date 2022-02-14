import { Injectable } from '@angular/core';
import { Person } from './person.model';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UtilService } from 'src/app/shared/util.service';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private http: HttpClient) {}

  getAll(page: number, size: number): Observable<Person[]> {
    const url = `${UtilService.BASE_URL}/persons/${page}/${size}`;
    return this.http.get<Person[]>(url);
  }
}
