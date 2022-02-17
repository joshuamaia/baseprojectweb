import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonRoutingModule } from './person-routing.module';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonFormComponent } from './person-form/person-form.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { PersonDetailComponent } from './person-detail/person-detail.component';

@NgModule({
  declarations: [
    PersonListComponent,
    PersonFormComponent,
    PersonDetailComponent,
  ],
  imports: [CommonModule, SharedModule, PersonRoutingModule],
})
export class PersonModule {}
