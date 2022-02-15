import { Component, Injector, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Address } from '../shared/address.model';
import { Person } from '../shared/person.model';
import { PersonService } from '../shared/person.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
})
export class PersonFormComponent extends BaseResourceFormComponent<Person> {
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
      email: [null, [Validators.required]],
      birthDate: [null, [Validators.required]],
      idAddress: [null, [Validators.required]],
      street: [null, [Validators.required]],
      district: [null, [Validators.required]],
      number: [null, [Validators.required]],
    });
  }

  loadResource() {
    if (this.currentAction == 'edit') {
      this.route.paramMap
        .pipe(
          switchMap((params: any) =>
            this.resourceService.getById(+params.get('id'))
          )
        )
        .subscribe(
          (resource: any) => {
            this.resource = resource;
            this.resourceForm.controls.street.patchValue(
              this.resource.address?.street
            );
            this.resourceForm.controls.district.patchValue(
              this.resource.address?.district
            );
            this.resourceForm.controls.number.patchValue(
              this.resource.address?.number
            );
            this.resourceForm.controls.idAddress.patchValue(
              this.resource.address?.id
            );
            this.resourceForm.patchValue(resource); // binds loaded resource data to resourceForm
          },
          (error: any) =>
            alert('Ocorreu um erro no servidor, tente mais tarde.')
        );
    }
  }

  createResource() {
    const resource: Person = this.jsonDataToResourceFn(this.resourceForm.value);

    const street = this.resourceForm.controls.street.value;
    const idAddress = this.resourceForm.controls.idAddress.value;
    const number = this.resourceForm.controls.number.value;
    const district = this.resourceForm.controls.district.value;

    const address: Address = new Address();

    address.id = idAddress;
    address.street = street;
    address.district = district;
    address.number = number;

    resource.address = address;

    this.resourceService.create(resource).subscribe(
      (resource) => this.actionsForSuccess(resource),
      (error) => this.actionsForError(error)
    );
  }

  updateResource() {
    const resource: Person = this.jsonDataToResourceFn(this.resourceForm.value);

    const street = this.resourceForm.controls.street.value;
    const idAddress = this.resourceForm.controls.idAddress.value;
    const number = this.resourceForm.controls.number.value;
    const district = this.resourceForm.controls.district.value;

    const address: Address = new Address();

    address.id = idAddress;
    address.street = street;
    address.district = district;
    address.number = number;

    resource.address = address;
    this.resourceService.update(resource).subscribe(
      (resource) => this.actionsForSuccess(resource),
      (error) => this.actionsForError(error)
    );
  }

  protected creationPageTitle(): string {
    return 'Add new Person';
  }

  protected editionPageTitle(): string {
    const personName = this.resource.name || '';
    return 'Editing PErson: ' + personName;
  }
}
