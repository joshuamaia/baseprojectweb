import { Injectable, Injector } from '@angular/core';
import { Person } from './person.model';

import { Observable } from 'rxjs';
import { UtilService } from 'src/app/shared/services/util.service';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

@Injectable({
  providedIn: 'root',
})
export class PersonService extends BaseResourceService<Person> {
  constructor(protected injector: Injector) {
    super(`${UtilService.BASE_URL}/persons`, injector, Person.fromJson);
  }
}
