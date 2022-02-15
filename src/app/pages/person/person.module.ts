import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonRoutingModule } from './person-routing.module';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonFormComponent } from './person-form/person-form.component';

import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { fontAwesomeIcons } from '../config/font-awesome-icons';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PersonListComponent, PersonFormComponent],
  imports: [CommonModule, SharedModule, FontAwesomeModule, PersonRoutingModule],
})
export class PersonModule {
  constructor(private fontAwesomeLibrary: FaIconLibrary) {
    this.configureFontAwesome();
  }

  private configureFontAwesome() {
    this.fontAwesomeLibrary.addIcons(...fontAwesomeIcons);
  }
}
