import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import Gender from '../shared/gender.model';
import { Person } from '../shared/person.model';
import { PersonService } from '../shared/person.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
})
export class PersonFormComponent
  extends BaseResourceFormComponent<Person>
  implements OnInit
{
  genders: Gender[] = [];
  constructor(
    protected personService: PersonService,
    protected injector: Injector
  ) {
    super(injector, new Person(), personService, Person.fromJson);
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      birthDate: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      address: this.formBuilder.group({
        id: [null],
        street: [null, [Validators.required]],
        district: [null, [Validators.required]],
        number: [null, [Validators.required]],
      }),
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.personService.getGenders().subscribe((response) => {
      this.genders = response;
    });
  }

  protected creationPageTitle(): string {
    return 'Add new Person';
  }

  protected editionPageTitle(): string {
    const personName = this.resource.name || '';
    return 'Editing Person: ' + personName;
  }
}
